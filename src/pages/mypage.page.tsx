import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getServerSession } from 'next-auth'
import React from 'react'
import MyPostCard from '~/components/Card/MyPage'
import prisma from '~/lib/prisma'
import { CustomNextPage } from '~/types/next-page'
import { MyPageUser } from '~/types/pages/mypage'
import { authOptions } from './api/auth/[...nextauth].api'

export const getServerSideProps: GetServerSideProps<{
  user: MyPageUser
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)

  const prismaUser = await prisma.user.findUnique({
    where: { id: session!.user!.id },
    include: {
      posts: { orderBy: { createdAt: 'desc' } },
      stars: {
        where: { userId: session!.user!.id },
        include: { post: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
  if (!prismaUser) throw new Error('User not found')

  const user: MyPageUser = {
    ...prismaUser,
    createdAt: prismaUser.createdAt.toString(),
    updatedAt: prismaUser.updatedAt.toString(),
    posts: prismaUser.posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toString(),
      updatedAt: post.updatedAt.toString(),
    })),
    stars: prismaUser.stars.map((star) => ({
      ...star,
      createdAt: star.createdAt.toString(),
      updatedAt: star.updatedAt.toString(),
      post: {
        ...star.post,
        createdAt: star.post.createdAt.toString(),
        updatedAt: star.post.updatedAt.toString(),
      },
    })),
  }

  return {
    props: { user },
  }
}

const MyPage: CustomNextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user }) => {
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-2'>
        <h2>My Posts</h2>
        <div className='grid grid-cols-4 gap-4'>
          {user.posts.map((post) => (
            <MyPostCard key={post.id} post={post} showDescription={false} />
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <h2>My Star Posts</h2>
        <div className='grid grid-cols-4 gap-4'>
          {user.stars.map((s) => (
            <MyPostCard key={s.id} post={s.post} />
          ))}
        </div>
      </div>
    </div>
  )
}

MyPage.requireAuth = true
export default MyPage
