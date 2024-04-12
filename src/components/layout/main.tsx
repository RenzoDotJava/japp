"use client"
import { SessionProvider } from "next-auth/react"

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default MainWrapper