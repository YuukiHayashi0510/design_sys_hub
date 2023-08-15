import '~/styles/globals.css'
import { NextComponentType } from 'next'
import Head from 'next/head'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import AuthGuard from '~/components/Guard/Auth'
import type { AppProps } from 'next/app'

export type CustomAppProps = AppProps<{ session: Session }> & {
  Component: NextComponentType & { requireAuth?: boolean }
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta content='initial-scale=1, width=device-width' name='viewport' />
      </Head>
      {Component.requireAuth ? (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}
