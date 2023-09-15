import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material'
import { Post } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '~/components/Button/Main'

export type PostCardProps = {
  post: Post
  className?: string
  showDescription?: boolean
}

/**
 * ポストのカード
 * @param post ポスト
 * @param className カードのクラス
 * @param showDescription 説明を表示するかどうか
 */
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
        <Button size='small'>
          <Link href={`/post/${post.id}`}>Detail</Link>
        </Button>
        <Button size='small'>
          <a href={post.url} rel='noopener noreferrer' target='_blank'>
            Learn More
          </a>
        </Button>
      </CardActions>
    </Card>
  )
}

export default PostCard
