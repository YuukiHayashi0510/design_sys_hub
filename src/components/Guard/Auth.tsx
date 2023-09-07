import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { PropsWithChildren, useEffect } from 'react'

const AuthGuard = ({ children }: PropsWithChildren) => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated' && router.pathname !== '/auth/signin')
      router.push('/auth/signin')
  }, [router, status])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'authenticated') return children
}

export default AuthGuard
