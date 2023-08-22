import React from 'react'
import Footer from './Footer'
import Header from './Header'

type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) {
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
