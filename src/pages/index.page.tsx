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
import { findPostAll } from './api/post/service'

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
                {post.image && (
                  <CardMedia
                    className='h-50 aspect-image'
                    image={post.image}
                    title={post.name}
                  />
                )}
                <CardContent>
                  <Typography component='div' gutterBottom variant='h5'>
                    {post.name}
                  </Typography>
                  <Typography color='text.secondary' variant='body2'>
                    {post.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href={post.url} size='small' target='_blank'>
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
  const res = await findPostAll()
  const allPosts = JSON.parse(JSON.stringify(res))

  return {
    props: { allPosts },
  }
}
