import {
  GithubIcon,
  GoogleIcon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/lib/auth-client";

import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function SignInForm({
  onSwitchToSignUp,
}: {
  onSwitchToSignUp: () => void;
}) {
  const router = useRouter();
  const { isPending } = authClient.useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
            toast.success("Sign in successful");
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText);
          },
        },
      );
    },
    validators: {
      onSubmit: z.object({
        email: z.email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      }),
    },
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl text-[#2563EB]">Flamingo</h1>
        <div className="flex flex-col gap-1">
          <h2 className="font-normal text-3xl text-[#111111]">Welcome back</h2>
          <p className="text-[#666666] text-sm">
            Enterprise analytics on the go
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type={mounted ? "button" : undefined}
          className="flex w-full cursor-pointer items-center justify-center gap-3 border border-[#E2E2E2] px-5 py-3 transition-colors hover:bg-[#f5f5f5]"
        >
          <HugeiconsIcon
            icon={GoogleIcon}
            className="size-[18px]"
            color="#4285F4"
          />
          <span className="font-normal text-[#111111] text-sm">
            Continue with Google
          </span>
        </button>
        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-center gap-3 border border-[#E2E2E2] px-5 py-3 transition-colors hover:bg-[#f5f5f5]"
        >
          <HugeiconsIcon
            icon={GithubIcon}
            className="size-[18px]"
            color="#333333"
          />
          <span className="font-normal text-[#111111] text-sm">
            Continue with GitHub
          </span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-[#D1D1D1]" />
        <span className="font-semibold text-[#777777] text-[11px] tracking-wider">
          OR
        </span>
        <div className="h-px flex-1 bg-[#D1D1D1]" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <form.Field name="email">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label
                htmlFor={field.name}
                className="font-semibold text-[#111111] text-xs"
              >
                Email Address
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                placeholder="you@company.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="border-[#E2E2E2] px-4 py-3 text-sm"
              />
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-destructive text-xs">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="flex flex-col gap-2">
              <Label
                htmlFor={field.name}
                className="font-semibold text-[#111111] text-xs"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="border-[#E2E2E2] px-4 py-3 pr-10 text-sm"
                />
                <button
                  type={mounted ? "button" : undefined}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[#666666] hover:text-[#111111]"
                >
                  <HugeiconsIcon
                    icon={showPassword ? ViewOffIcon : ViewIcon}
                    className="size-4"
                  />
                </button>
              </div>
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-destructive text-xs">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <div className="flex flex-col gap-4">
          <button
            type={mounted ? "button" : undefined}
            className="self-end text-[#3B82F6] text-sm hover:underline"
          >
            Forgot password?
          </button>

          <form.Subscribe>
            {(state) => (
              <Button
                type="submit"
                className="w-full cursor-pointer bg-[#2563EB] px-5 py-3.5 font-bold text-sm text-white hover:bg-[#1d4ed8] disabled:opacity-50"
                disabled={!state.canSubmit || state.isSubmitting}
              >
                {state.isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>

      <div className="flex items-center justify-center gap-1 pt-0">
        <span className="text-[#666666] text-sm">
          Don&apos;t have an account?
        </span>
        <button
          type={mounted ? "button" : undefined}
          onClick={onSwitchToSignUp}
          className="cursor-pointer font-semibold text-[#2563EB] text-sm hover:underline"
        >
          Create one
        </button>
      </div>
    </div>
  );
}
