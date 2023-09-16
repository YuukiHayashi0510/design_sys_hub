import { Post, StarWithPost, User } from './model'

export type MyPageUser = User & {
  posts: Post[]
  stars: StarWithPost[]
}
