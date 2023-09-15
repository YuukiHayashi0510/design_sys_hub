import { Post } from '@prisma/client'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import PostCard from '~/components/Card/Post'
import Pagination from '~/components/Pagination'
import { usePage } from '~/lib/hooks/usePage'
import prisma from '~/lib/prisma'

export const getServerSideProps: GetServerSideProps<{
  posts: Post[]
  totalPages: number
}> = async ({ query: { page = 1 } }) => {
  const currentPage = parseInt(page as string, 10)
  const PER_PAGE = 12

  const totalPosts = await prisma.post.count()
  const totalPages = Math.ceil(totalPosts / PER_PAGE)

  const res = await prisma.post.findMany({
    skip: (currentPage - 1) * PER_PAGE,
    take: PER_PAGE,
    orderBy: { createdAt: 'desc' },
  })
  // JSON.parse(JSON.stringify(res)) で Datetime処理できない問題に対処
  const posts = JSON.parse(JSON.stringify(res)) as Post[]

  return {
    props: { posts, totalPages },
  }
}

export default function Home({
  posts,
  totalPages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const page = usePage()
  const router = useRouter()

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
        {posts.map((post) => (
          <PostCard className='w-auto' key={post.id} post={post} />
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
