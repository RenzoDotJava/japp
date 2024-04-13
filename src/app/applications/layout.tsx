import React, { Fragment } from 'react'
import { getServerSession } from 'next-auth';

import Header from "@/components/organisms/header";
import { authConfig } from '@/lib/auth';

export default async function ApplicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig)

  return (
    <Fragment>
      {session && <Header session={session} />}
      <main className='p-6 md:p-10 box-border h-[calc(100vh-70px)]'>
        {children}
      </main>
    </Fragment>
  )
}