import { Post, User } from '@prisma/client'

export type CreatePostData = {
  name: string
  description: string
  image: string
  url: string
  userId: string
}

export type UpdatePostData = {
  id: string
  name: string
  description: string
  image: string
  url: string
}

export type UpdatePostBody = {
  name: string
  description: string
  image: string
  url: string
}

// 参考:https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types#problem-using-variations-of-the-generated-model-type
export type PostWithUser = Post & {
  user: User
}
