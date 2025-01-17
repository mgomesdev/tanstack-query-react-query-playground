"use client";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

const makeQueryClient = () => {
   return new QueryClient({
      defaultOptions: {
         queries: {
            staleTime: 60 * 1000, // 1 min.
         },
      },
   });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
   if (isServer) {
      return makeQueryClient();
   } else {
      if (!browserQueryClient) browserQueryClient = makeQueryClient();

      return browserQueryClient;
   }
};

interface ProviderProps {
   children: React.ReactNode;
}

function Provider({ children }: ProviderProps) {
   return (
      <QueryClientProvider client={getQueryClient()}>
         <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
}

export default Provider;
