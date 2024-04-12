import React, { Fragment } from 'react'
import { getServerSession } from 'next-auth';

import Header from "@/components/organisms/header";
import { authConfig } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig)

  return (
    <Fragment>
      {session && <Header session={session} />}
      <main>
        {children}
      </main>
    </Fragment>
  )
}