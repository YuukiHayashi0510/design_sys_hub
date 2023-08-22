import { Post } from '@prisma/client'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import PostCard from '~/components/Card/Post'
import prisma from '~/lib/prisma'

export default function Home({
  allPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className='flex flex-col items-center justify-between'>
      <h1>一覧</h1>
      <div className='tablet:grid tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4'>
        {allPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps<{
  allPosts: Post[]
}> = async () => {
  const res = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })
  const allPosts = JSON.parse(JSON.stringify(res))

  return {
    props: { allPosts },
  }
}
