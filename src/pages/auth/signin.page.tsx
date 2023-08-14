import { InferGetServerSidePropsType } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import GithubButton from '~/components/Button/Github'
import StyledGoogleButton from '~/components/Button/Google'

const SignIn = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className='my-10 flex flex-col items-center justify-center gap-3'>
      <h2 className='mb-4 text-2xl'>ログイン</h2>
      {providers &&
        Object.values(providers).map((provider) => {
          const onClick = () => signIn(provider.id)
          return (
            <div key={provider.id}>
              {provider.name === 'GitHub' && <GithubButton onClick={onClick} />}
              {provider.name === 'Google' && (
                <StyledGoogleButton onClick={onClick} />
              )}
              {process.env.NODE_ENV !== 'production' && (
                <>
                  {provider.name === 'Test' && (
                    <button
                      className='my-4 inline-flex w-60 cursor-pointer items-center justify-center px-5 py-2.5 text-center text-sm font-medium'
                      onClick={onClick}
                    >
                      Test環境ログイン
                    </button>
                  )}
                </>
              )}
            </div>
          )
        })}
    </div>
  )
}

export default SignIn

export const getServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
