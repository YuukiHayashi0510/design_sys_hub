import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '~/components/Button/Main'
import { Post } from '~/types/pages/model'
import Card from '..'

export type MyPostCardProps = {
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
function MyPostCard({
  post,
  className,
  showDescription = true,
}: MyPostCardProps) {
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
    </Card>
  )
}

export default MyPostCard
