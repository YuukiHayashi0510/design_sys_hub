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
