import { env } from "@flamingo/env/server";
import {
  type Index,
  MeiliSearch,
  type SearchParams,
  type SearchResponse,
} from "meilisearch";

export const searchClient = new MeiliSearch({
  host: env.MEILISEARCH_HOST ?? "http://localhost:7700",
  apiKey: env.MEILISEARCH_API_KEY,
});

export async function getIndex<T extends Record<string, unknown>>(
  indexName: string,
): Promise<Index<T>> {
  return searchClient.index<T>(indexName);
}

export async function search<T extends Record<string, unknown>>(
  indexName: string,
  query: string,
  options?: SearchParams,
): Promise<SearchResponse<T>> {
  const index = searchClient.index<T>(indexName);
  return index.search(query, options);
}

export async function addDocuments<T extends Record<string, unknown>>(
  indexName: string,
  documents: T[],
  options?: { primaryKey?: string },
): Promise<{ taskUid: number }> {
  const index = searchClient.index<T>(indexName);
  const task = await index.addDocuments(documents, options);
  return { taskUid: task.taskUid };
}

export async function updateDocuments<T extends Record<string, unknown>>(
  indexName: string,
  documents: Partial<T>[],
  options?: { primaryKey?: string },
): Promise<{ taskUid: number }> {
  const index = searchClient.index<T>(indexName);
  const task = await index.updateDocuments(documents, options);
  return { taskUid: task.taskUid };
}

export async function deleteDocument(
  indexName: string,
  documentId: string | number,
): Promise<{ taskUid: number }> {
  const index = searchClient.index(indexName);
  const task = await index.deleteDocument(documentId);
  return { taskUid: task.taskUid };
}

export async function deleteDocuments(
  indexName: string,
  documentIds: string[],
): Promise<{ taskUid: number }> {
  const index = searchClient.index(indexName);
  const task = await index.deleteDocuments(documentIds);
  return { taskUid: task.taskUid };
}

export async function deleteAllDocuments(
  indexName: string,
): Promise<{ taskUid: number }> {
  const index = searchClient.index(indexName);
  const task = await index.deleteAllDocuments();
  return { taskUid: task.taskUid };
}

export async function getDocument<T extends Record<string, unknown>>(
  indexName: string,
  documentId: string | number,
): Promise<T | null> {
  try {
    const index = searchClient.index<T>(indexName);
    return (await index.getDocument(documentId)) as T;
  } catch {
    return null;
  }
}

export async function getDocuments<T extends Record<string, unknown>>(
  indexName: string,
  options?: { offset?: number; limit?: number; fields?: string[] },
): Promise<{ results: T[]; offset: number; limit: number; total: number }> {
  const index = searchClient.index<T>(indexName);
  const result = await index.getDocuments(
    options as Parameters<typeof index.getDocuments>[0],
  );
  return {
    results: result.results as T[],
    offset: result.offset ?? 0,
    limit: result.limit ?? 20,
    total: result.total,
  };
}

export async function createIndex(
  indexName: string,
  options?: { primaryKey?: string },
): Promise<{ taskUid: number }> {
  const task = await searchClient.createIndex(indexName, options);
  return { taskUid: task.taskUid };
}

export async function deleteIndex(
  indexName: string,
): Promise<{ taskUid: number }> {
  const task = await searchClient.deleteIndex(indexName);
  return { taskUid: task.taskUid };
}

export async function getIndexes(): Promise<
  { uid: string; primaryKey: string | undefined }[]
> {
  const { results } = await searchClient.getIndexes();
  return results.map((index) => ({
    uid: index.uid,
    primaryKey: index.primaryKey,
  }));
}

export async function updateSearchableAttributes(
  indexName: string,
  attributes: string[],
): Promise<{ taskUid: number }> {
  const index = searchClient.index(indexName);
  const task = await index.updateSearchableAttributes(attributes);
  return { taskUid: task.taskUid };
}

export async function updateFilterableAttributes(
  indexName: string,
  attributes: string[],
): Promise<{ taskUid: number }> {
  const index = searchClient.index(indexName);
  const task = await index.updateFilterableAttributes(attributes);
  return { taskUid: task.taskUid };
}

export async function updateSortableAttributes(
  indexName: string,
  attributes: string[],
): Promise<{ taskUid: number }> {
  const index = searchClient.index(indexName);
  const task = await index.updateSortableAttributes(attributes);
  return { taskUid: task.taskUid };
}

export async function waitForTask(taskUid: number): Promise<void> {
  await searchClient.waitForTask(taskUid);
}

export async function getTaskStatus(taskUid: number): Promise<{
  status: "enqueued" | "processing" | "succeeded" | "failed" | "canceled";
  error?: { message: string; code: string };
}> {
  const task = await searchClient.getTask(taskUid);
  return {
    status: task.status as
      | "enqueued"
      | "processing"
      | "succeeded"
      | "failed"
      | "canceled",
    error: task.error
      ? { message: task.error.message, code: task.error.code }
      : undefined,
  };
}

export async function healthCheck(): Promise<{
  status: "available" | "unavailable";
}> {
  try {
    await searchClient.health();
    return { status: "available" };
  } catch {
    return { status: "unavailable" };
  }
}
