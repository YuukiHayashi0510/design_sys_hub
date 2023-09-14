import { Post } from '@prisma/client'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import PostCard from '~/components/Card/Post'
import Pagination from '~/components/Pagination'
import { usePage } from '~/lib/hooks/usePage'
import prisma from '~/lib/prisma'

export default function Home({
  posts,
  totalPage,
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
        totalPage={totalPage}
      />
      <div className='gap-4 tablet:grid tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4'>
        {posts.map((post) => (
          <PostCard className='w-auto' key={post.id} post={post} />
        ))}
      </div>
      <Pagination
        onChange={onChangePagination}
        page={page ?? 1}
        totalPage={totalPage}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  posts: Post[]
  totalPage: number
}> = async (context) => {
  const PER_PAGE = 12
  const page = context.query.page ?? 1

  const res = await prisma.post.findMany({
    skip: (Number(page) - 1) * PER_PAGE ?? 0,
    take: PER_PAGE,
    orderBy: { createdAt: 'desc' },
  })
  const posts = JSON.parse(JSON.stringify(res)) as Post[]
  const count = await prisma.post.count()

  const totalPage = Math.ceil(count / PER_PAGE)

  return {
    props: { posts, totalPage },
  }
}
