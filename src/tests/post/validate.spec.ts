import { isCreatePostData, isUpdatePostData } from '~/pages/api/post/validate'
import { CreatePostData, UpdatePostData } from '~/types/post'

describe('Post Validation Test', () => {
  describe('CreatePostData', () => {
    it('Success', () => {
      const data: CreatePostData = {
        name: '',
        description: '',
        image: '',
        url: '',
        userId: '',
      }

      const isSuccess = isCreatePostData(data)
      expect(isSuccess).toBe(true)
    })
    it('Failure', () => {
      const data = {
        name: '',
        description: '',
        image: '',
        url: '',
      }

      const isFailure = isCreatePostData(data)
      expect(isFailure).toBe(false)
    })
  })
  describe('UpdatePostData', () => {
    it('Success', () => {
      const data: UpdatePostData = {
        id: '',
        name: '',
        description: '',
        image: '',
        url: '',
      }

      const isSuccess = isUpdatePostData(data)
      expect(isSuccess).toBe(true)
    })
    it('Failure', () => {
      const data = {
        name: '',
        description: '',
        image: '',
        url: '',
      }

      const isFailure = isUpdatePostData(data)
      expect(isFailure).toBe(false)
    })
  })
})
