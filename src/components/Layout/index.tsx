import React, { PropsWithChildren } from 'react'
import Footer from './Footer'
import Header from './Header'

function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <main className='min-h-screen p-4 tablet:p-6 laptop:p-8 desktop:p-10'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
