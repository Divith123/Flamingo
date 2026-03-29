import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  type GetObjectCommandInput,
  HeadObjectCommand,
  ListObjectsV2Command,
  type ListObjectsV2CommandInput,
  PutObjectCommand,
  type PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { env } from "@flamingo/env/server";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: env.R2_SECRET_ACCESS_KEY ?? "",
  },
});

const BUCKET_NAME = env.R2_BUCKET_NAME ?? "";

export async function uploadFile(
  key: string,
  body: Buffer | Uint8Array | string | ReadableStream,
  options?: {
    contentType?: string;
    metadata?: Record<string, string>;
  },
): Promise<{ key: string; etag?: string }> {
  const input: PutObjectCommandInput = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: options?.contentType,
    Metadata: options?.metadata,
  };

  const command = new PutObjectCommand(input);
  const response = await r2Client.send(command);

  return {
    key,
    etag: response.ETag,
  };
}

export async function downloadFile(key: string): Promise<{
  body: ReadableStream | null;
  contentType?: string;
  contentLength?: number;
  metadata?: Record<string, string>;
}> {
  const input: GetObjectCommandInput = {
    Bucket: BUCKET_NAME,
    Key: key,
  };

  const command = new GetObjectCommand(input);
  const response = await r2Client.send(command);

  return {
    body: response.Body?.transformToWebStream() ?? null,
    contentType: response.ContentType,
    contentLength: response.ContentLength,
    metadata: response.Metadata,
  };
}

export async function downloadFileAsBuffer(key: string): Promise<Buffer> {
  const input: GetObjectCommandInput = {
    Bucket: BUCKET_NAME,
    Key: key,
  };

  const command = new GetObjectCommand(input);
  const response = await r2Client.send(command);

  if (!response.Body) {
    throw new Error(`File not found: ${key}`);
  }

  const bytes = await response.Body.transformToByteArray();
  return Buffer.from(bytes);
}

export async function deleteFile(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await r2Client.send(command);
}

export async function deleteFiles(keys: string[]): Promise<void> {
  await Promise.all(keys.map((key) => deleteFile(key)));
}

export async function listFiles(
  prefix?: string,
  options?: {
    maxKeys?: number;
    continuationToken?: string;
  },
): Promise<{
  files: { key: string; size?: number; lastModified?: Date }[];
  isTruncated: boolean;
  nextContinuationToken?: string;
}> {
  const input: ListObjectsV2CommandInput = {
    Bucket: BUCKET_NAME,
    Prefix: prefix,
    MaxKeys: options?.maxKeys ?? 1000,
    ContinuationToken: options?.continuationToken,
  };

  const command = new ListObjectsV2Command(input);
  const response = await r2Client.send(command);

  return {
    files: (response.Contents ?? []).map((item) => ({
      key: item.Key ?? "",
      size: item.Size,
      lastModified: item.LastModified,
    })),
    isTruncated: response.IsTruncated ?? false,
    nextContinuationToken: response.NextContinuationToken,
  };
}

export async function fileExists(key: string): Promise<boolean> {
  try {
    const command = new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await r2Client.send(command);
    return true;
  } catch {
    return false;
  }
}

export async function getFileMetadata(key: string): Promise<{
  contentType?: string;
  contentLength?: number;
  lastModified?: Date;
  metadata?: Record<string, string>;
} | null> {
  try {
    const command = new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const response = await r2Client.send(command);

    return {
      contentType: response.ContentType,
      contentLength: response.ContentLength,
      lastModified: response.LastModified,
      metadata: response.Metadata,
    };
  } catch {
    return null;
  }
}

export async function copyFile(
  sourceKey: string,
  destinationKey: string,
): Promise<{ key: string; etag?: string }> {
  const command = new CopyObjectCommand({
    Bucket: BUCKET_NAME,
    CopySource: `${BUCKET_NAME}/${sourceKey}`,
    Key: destinationKey,
  });

  const response = await r2Client.send(command);

  return {
    key: destinationKey,
    etag: response.CopyObjectResult?.ETag,
  };
}

export async function moveFile(
  sourceKey: string,
  destinationKey: string,
): Promise<{ key: string; etag?: string }> {
  const result = await copyFile(sourceKey, destinationKey);
  await deleteFile(sourceKey);
  return result;
}

export async function getUploadUrl(
  key: string,
  options?: {
    expiresIn?: number;
    contentType?: string;
  },
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: options?.contentType,
  });

  return getSignedUrl(r2Client, command, {
    expiresIn: options?.expiresIn ?? 3600,
  });
}

export async function getDownloadUrl(
  key: string,
  options?: {
    expiresIn?: number;
    responseContentDisposition?: string;
  },
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ResponseContentDisposition: options?.responseContentDisposition,
  });

  return getSignedUrl(r2Client, command, {
    expiresIn: options?.expiresIn ?? 3600,
  });
}

export function getPublicUrl(key: string, customDomain?: string): string {
  if (customDomain) {
    return `https://${customDomain}/${key}`;
  }
  return `https://${BUCKET_NAME}.${env.R2_ACCOUNT_ID}.r2.dev/${key}`;
}
