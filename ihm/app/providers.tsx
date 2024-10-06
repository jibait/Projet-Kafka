"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { StoreProvider } from "./context/StoreContext";
import { Store } from "./store/Store";
import { useRef } from "react";
import { ComService } from "./services/ComService";

export function Providers({ children }: { children: React.ReactNode }) {
  const store = useRef<Store | undefined>(undefined);
  const comService = useRef<ComService | undefined>(undefined);

  // Initialisation des services
  if (store.current === undefined || comService.current === undefined) {
    store.current = new Store();
    comService.current = new ComService({store: store.current, url: "ws://localhost:3001"});
  }

  return (
    <CacheProvider>
      <StoreProvider value={store.current}>
        <ChakraProvider>{children}</ChakraProvider>
      </StoreProvider>
    </CacheProvider>
  );
}
