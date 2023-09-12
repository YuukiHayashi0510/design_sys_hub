import { signOut, useSession } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'
import Footer from './Footer'
import Header from './Header'

function Layout({ children }: PropsWithChildren) {
  const { data: session } = useSession()
  return (
    <div>
      <Header onClickSignOut={() => signOut()} user={session?.user} />
      <main className='min-h-screen p-4 tablet:p-6 laptop:p-8 desktop:p-10'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
