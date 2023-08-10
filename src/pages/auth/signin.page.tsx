import { InferGetServerSidePropsType } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import GithubButton from '~/components/Button/Github'
import StyledGoogleButton from '~/components/Button/Google'

const SignIn = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className='flex flex-col items-center gap-3 justify-center my-10'>
      <h2 className='text-2xl mb-4'>ログイン</h2>
      {providers &&
        Object.values(providers).map((provider) => {
          const onClick = () => signIn(provider.id)
          return (
            <div key={provider.id}>
              {provider.name === 'GitHub' && <GithubButton onClick={onClick} />}
              {provider.name === 'Google' && (
                <StyledGoogleButton onClick={onClick} />
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
