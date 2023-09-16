import '~/styles/globals.css'
import { NextComponentType } from 'next'
import Head from 'next/head'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import Layout from '~/components/Layout'
import AuthGuard from '~/lib/guard/Auth'
import AlertProvider from '~/lib/providers/Alert'
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
      <AlertProvider>
        <Head>
          <title>Design System Hub</title>
          <meta content='initial-scale=1, width=device-width' name='viewport' />
        </Head>
        <Layout>
          {Component.requireAuth ? (
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </AlertProvider>
    </SessionProvider>
  )
}
