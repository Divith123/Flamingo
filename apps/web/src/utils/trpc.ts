import type { AppRouter } from "@flamingo/api/routers/index";

import { env } from "@flamingo/env/web";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Only show error toasts for queries that have failed multiple times
      // and aren't successfully showing old data (background updates)
      if (query.state.fetchFailureCount > 2 && !query.state.data) {
        toast.error(error.message, {
          id: `query-error-${query.queryHash}`, // Prevent duplicate toasts for same query
          action: {
            label: "retry",
            onClick: () => {
              queryClient.invalidateQueries({ queryKey: query.queryKey });
            },
          },
        });
      }
    },
  }),
});

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${env.NEXT_PUBLIC_SERVER_URL}/trpc`,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
