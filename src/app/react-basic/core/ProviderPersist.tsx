"use client";

import React from "react";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

const queryCilent = new QueryClient({
   defaultOptions: {
      queries: {
         gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
   },
});

const persister = createSyncStoragePersister({
   storage: window.localStorage,
});

interface ProviderPersistProps {
   children: React.ReactNode;
}

function ProviderPersist({ children }: ProviderPersistProps) {
   return (
      <PersistQueryClientProvider client={queryCilent} persistOptions={{ persister }}>
         {children}
      </PersistQueryClientProvider>
   );
}
export default ProviderPersist;