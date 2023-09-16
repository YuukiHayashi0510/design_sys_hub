import { Post, Star } from './model'

export type PostWithStarCount = Post & {
  _count: {
    stars: number
  }
  stars: Star[]
}
