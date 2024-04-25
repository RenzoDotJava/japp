"use client"
import { SessionProvider } from "next-auth/react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  )
}

export default MainWrapper