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
  showDescription?: boolean
} & ComponentPropsWithoutRef<typeof Card>

function PostCard({ post, className, showDescription = true }: PostCardProps) {
  const allClasses = twMerge(
    'relative w-[400px]',
    showDescription && 'h-[400px]',
    className,
  )

  return (
    <Card className={allClasses}>
      <div className='relative'>
        <CardMedia
          className='aspect-image'
          image={post.image}
          title={post.name}
        />
      </div>
      <CardContent>
        <Typography
          className={showDescription ? 'max-h-[38px] overflow-hidden' : ''}
          component='div'
          gutterBottom
          variant='h6'
        >
          {post.name}
        </Typography>
        {showDescription && (
          <Typography
            className='max-h-[83px] overflow-hidden'
            color='text.secondary'
            variant='body2'
          >
            {post.description}
          </Typography>
        )}
      </CardContent>
      <CardActions className={showDescription ? 'absolute bottom-0' : ''}>
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
