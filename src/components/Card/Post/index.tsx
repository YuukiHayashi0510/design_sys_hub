import { Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '~/components/Button/Main'
import Card from '..'
import type { PostWithStarCount } from '~/types/pages'

export type PostCardProps = {
  post: PostWithStarCount
  className?: string
  showDescription?: boolean
  onClickStar: (postId: string) => void
  onClickUnstar: (postId: string, starId: string) => void
}

/**
 * ポストのカード
 * @param post ポスト
 * @param className カードのクラス
 * @param showDescription 説明を表示するかどうか
 * @param onClickStar スターをつける
 * @param onClickUnstar スターを外す
 */
function PostCard({
  post,
  className,
  showDescription = true,
  onClickStar,
  onClickUnstar,
}: PostCardProps) {
  const allClasses = twMerge(showDescription && 'h-[400px]', className)

  return (
    <Card
      className={allClasses}
      description={post.description}
      image={post.image}
      imageTitle={post.name}
      showDescription={showDescription}
      title={post.name}
    >
      <Button size='small'>
        <Link href={`/post/${post.id}`}>Detail</Link>
      </Button>
      <Button size='small'>
        <a href={post.url} rel='noopener noreferrer' target='_blank'>
          Learn More
        </a>
      </Button>
      {post.stars.length > 0 ? (
        <Button onClick={() => onClickUnstar(post.id, post.stars[0].id)}>
          Unstar
        </Button>
      ) : (
        <Button onClick={() => onClickStar(post.id)}>Star</Button>
      )}
      <Typography color='text.secondary' variant='body2'>
        {post._count.stars}
      </Typography>
    </Card>
  )
}

export default PostCard
