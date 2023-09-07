import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getServerSession } from 'next-auth'
import React from 'react'
import PostCard from '~/components/Card/Post'
import prisma from '~/lib/prisma'
import { MyPageUser } from '~/types/api/post'
import { CustomNextPage } from '~/types/next-page'
import { authOptions } from './api/auth/[...nextauth].api'

const MyPage: CustomNextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user }) => {
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-2'>
        <h2>My Posts</h2>
        <div className='grid grid-cols-4 gap-4'>
          {user.posts.map((post) => (
            <PostCard key={post.id} post={post} showDescription={false} />
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <h2>My Star Posts</h2>
        <div className='grid grid-cols-4 gap-4'>
          {user.stars.map((s) => (
            <PostCard key={s.id} post={s.post} />
          ))}
        </div>
      </div>
    </div>
  )
}

MyPage.requireAuth = true
export default MyPage

export const getServerSideProps: GetServerSideProps<{
  user: MyPageUser
}> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  const res = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    include: {
      posts: { orderBy: { createdAt: 'desc' } },
      stars: { where: { userId: session?.user?.id }, include: { post: true } },
    },
  })

  const user = JSON.parse(JSON.stringify(res))

  return {
    props: { user },
  }
}
