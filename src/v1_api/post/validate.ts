import { CreatePostData, UpdatePostData } from '~/types/api/post'

export const isCreatePostData = (value: object): value is CreatePostData => {
  return (
    'name' in value &&
    'description' in value &&
    'image' in value &&
    'url' in value &&
    'userId' in value
  )
}

export const isUpdatePostData = (value: object): value is UpdatePostData => {
  return (
    'id' in value &&
    'name' in value &&
    'description' in value &&
    'image' in value &&
    'url' in value
  )
}
