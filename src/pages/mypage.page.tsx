import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { CustomNextPage } from '~/types/next-page'

const MyPage: CustomNextPage = () => {
  const { data, status } = useSession()

  return (
    <div className=''>
      {data?.user?.name || <Link href='/auth/signin'>SignIn</Link>}
      {status === 'authenticated' && (
        <button className='ml-5' onClick={() => signOut()}>
          SignOut
        </button>
      )}
    </div>
  )
}

export default MyPage
MyPage.requireAuth = true
