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
    <div className=''>
      <div></div>
      {/* post */}
      <div className='grid-cols-4 gap-4 laptop:grid'>
        {user.posts.map((post) => (
          <PostCard description={false} key={post.id} post={post} />
        ))}
      </div>

      {/* star-post */}
      <div>
        {user.stars.map((s) => (
          <PostCard key={s.id} post={s.post} />
        ))}
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
