import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { Post } from '@prisma/client'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import prisma from '~/lib/prisma'

export default function Home({
  allPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className='flex flex-col items-center justify-between'>
      <h1>一覧</h1>
      <div className='tablet:grid tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4'>
        {allPosts &&
          allPosts.map((post) => {
            return (
              <Card key={post.id}>
                <div className='relative'>
                  <CardMedia
                    className='h-50 aspect-image'
                    image={post.image}
                    title={post.name}
                  />
                </div>
                <CardContent>
                  <Typography component='div' gutterBottom variant='h5'>
                    {post.name}
                  </Typography>
                  <Typography color='text.secondary' variant='body2'>
                    {post.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    className='normal-case'
                    href={`/post/${post.id}`}
                    size='small'
                  >
                    Detail
                  </Button>
                  <Button
                    className='normal-case'
                    href={post.url}
                    size='small'
                    target='_blank'
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            )
          })}
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
