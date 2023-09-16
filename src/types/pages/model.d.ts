import {
  Post as PrismaPost,
  Star as PrismaStar,
  User as PrismaUser,
} from '@prisma/client'

// DBモデルのCreatedAt,UpdatedAtをstringに変換する
type Model<T> = Omit<Omit<T, 'createdAt'>, 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export type Post = Model<PrismaPost> & {
  createdAt: string
  updatedAt: string
}

export type Star = Model<PrismaStar> & {
  createdAt: string
  updatedAt: string
}

export type StarWithPost = Star & {
  post: Post
}

export type User = Model<PrismaUser> & {
  createdAt: string
  updatedAt: string
}
