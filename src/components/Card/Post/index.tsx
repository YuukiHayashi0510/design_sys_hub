import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material'
import { Post } from '@prisma/client'
import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type PostCardProps = {
  post: Post
  className?: string
  description?: boolean
} & ComponentPropsWithoutRef<typeof Card>

function PostCard({ post, className, description = true }: PostCardProps) {
  const allClasses = twMerge('', className)

  return (
    <Card className={allClasses}>
      <div className='relative'>
        <CardMedia
          className='tablet:h-50 h-35 aspect-image'
          image={post.image}
          title={post.name}
        />
      </div>
      <CardContent>
        <Typography component='div' gutterBottom variant='h5'>
          {post.name}
        </Typography>
        {description && (
          <Typography color='text.secondary' variant='body2'>
            {post.description}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button className='normal-case' href={`/post/${post.id}`} size='small'>
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
}

export default PostCard
