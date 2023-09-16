import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { useEffect, useState } from 'react'
import PostCard from '~/components/Card/Post'
import Pagination from '~/components/Pagination'
import { usePage } from '~/lib/hooks/usePage'
import prisma from '~/lib/prisma'
import { authOptions } from './api/auth/[...nextauth].api'
import type { PostWithStarCount } from '~/types/pages'

export const getServerSideProps: GetServerSideProps<{
  posts: PostWithStarCount[]
  totalPages: number
}> = async ({ req, res, query: { page = 1 } }) => {
  // ページネーション
  const currentPage = parseInt(page as string, 10)
  const PER_PAGE = 12

  const totalPosts = await prisma.post.count()
  const totalPages = Math.ceil(totalPosts / PER_PAGE)

  // starを持っているかどうか
  const session = await getServerSession(req, res, authOptions)

  const prismaPosts = await prisma.post.findMany({
    skip: (currentPage - 1) * PER_PAGE,
    take: PER_PAGE,
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { stars: true },
      },
      stars: {
        where: { userId: session?.user?.id ?? '' },
      },
    },
  })

  // Datetime処理できない問題に対処
  const posts = prismaPosts.map((post) => {
    return {
      ...post,
      createdAt: post.createdAt.toString(),
      updatedAt: post.updatedAt.toString(),
      stars: post.stars.map((star) => ({
        ...star,
        createdAt: star.createdAt.toString(),
        updatedAt: star.updatedAt.toString(),
      })),
    }
  })

  return {
    props: { posts, totalPages },
  }
}

export default function Home({
  posts,
  totalPages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [allPosts, setAllPosts] = useState<PostWithStarCount[]>(posts)
  const page = usePage()
  const router = useRouter()

  useEffect(() => {
    setAllPosts(posts)
  }, [posts])

  const onClickStar = async (postId: string) => {
    const res = await fetch(`/api/post/${postId}/star`, {
      method: 'POST',
    })
    // TODO: Error Handling
    if (!res.ok) return

    const json = await res.json()
    setAllPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              _count: {
                ...post._count,
                stars: json.count,
              },
              stars: [...post.stars, json.star],
            }
          : post,
      ),
    )
  }

  const onClickUnstar = async (postId: string, starId: string) => {
    const res = await fetch(`/api/post/${postId}/star/${starId}`, {
      method: 'DELETE',
    })
    // TODO: Error Handling
    if (!res.ok) return

    const json = await res.json()
    setAllPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              _count: {
                ...post._count,
                stars: json.count,
              },
              stars: post.stars.filter((star) => star.id !== starId),
            }
          : post,
      ),
    )
  }

  const onChangePagination = (value: number) => {
    router.push({ query: { page: value } })
  }

  return (
    <div className='flex flex-col items-center justify-between gap-6'>
      <h1>一覧</h1>
      <Pagination
        onChange={onChangePagination}
        page={page ?? 1}
        totalPage={totalPages}
      />
      <div className='gap-4 tablet:grid tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4'>
        {allPosts.map((post) => (
          <PostCard
            className='w-auto'
            key={post.id}
            onClickStar={onClickStar}
            onClickUnstar={onClickUnstar}
            post={post}
          />
        ))}
      </div>
      <Pagination
        onChange={onChangePagination}
        page={page ?? 1}
        totalPage={totalPages}
      />
    </div>
  )
}
