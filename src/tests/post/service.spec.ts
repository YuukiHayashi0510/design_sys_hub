import { Post, User } from '@prisma/client'
import prisma, { cleanUpDatabase } from '~/lib/prisma'
import {
  createPost,
  deletePost,
  findPostAll,
  findPostById,
  searchPostByKeyword,
  updatePost,
} from '~/pages/api/post/service'
import { CreatePostData, UpdatePostData } from '~/types/api/post'

describe('Post Service Test', () => {
  let post: Post
  let user: User

  async function createData() {
    const name = 'test user'
    user = await prisma.user.create({
      data: {
        name,
      },
    })

    post = await prisma.post.create({
      data: {
        name: 'test',
        description: '',
        url: '',
        image: '',
        userId: user.id,
      },
    })
  }

  beforeEach(async () => {
    await cleanUpDatabase()
    await createData()
  })

  afterAll(async () => {
    await cleanUpDatabase()
    await prisma.$disconnect()
  })

  describe('Create', () => {
    it('Create One Success', async () => {
      const data: CreatePostData = {
        name: '',
        description: '',
        url: '',
        image: '',
        userId: user.id,
      }
      const tmp = await createPost(data)
      if (tmp) post = tmp

      expect(post).toMatchObject(data)
    })
  })

  describe('Read', () => {
    it('Read All', async () => {
      const count = await prisma.post.count()
      const allPosts = await findPostAll()

      expect(allPosts.length).toBe(count)
    })

    it('Find by ID', async () => {
      const res = await findPostById(post.id)
      expect(res).toMatchObject(post)
    })

    describe('Search by Keyword', () => {
      const keyword = 'test'

      describe('Success', () => {
        it('Hit Name Column', async () => {
          const res = await searchPostByKeyword(keyword)

          expect(res.length).toBe(1)
          expect(res[0].name).toBe(post.name)
          expect(res[0].description).toBe(post.description)
          expect(res[0].image).toBe(post.image)
          expect(res[0].url).toBe(post.url)
        })

        it('Hit Description Column', async () => {
          const p = await prisma.post.update({
            where: { id: post.id },
            data: {
              ...post,
              name: '',
              description: keyword,
            },
          })

          const res = await searchPostByKeyword(keyword)

          expect(res.length).toBe(1)
          expect(res[0].name).toBe(p.name)
          expect(res[0].description).toBe(p.description)
          expect(res[0].image).toBe(p.image)
          expect(res[0].url).toBe(p.url)
        })

        it('Hit Name & Description', async () => {
          const p = await prisma.post.update({
            where: { id: post.id },
            data: {
              ...post,
              name: keyword,
              description: keyword,
            },
          })

          const res = await searchPostByKeyword(keyword)

          expect(res.length).toBe(1)
          expect(res[0].name).toBe(p.name)
          expect(res[0].description).toBe(p.description)
          expect(res[0].image).toBe(p.image)
          expect(res[0].url).toBe(p.url)
        })
      })
    })
  })

  describe('Update', () => {
    it('Update One', async () => {
      const data: UpdatePostData = {
        id: post.id,
        name: 'update',
        description: post.description,
        image: post.image,
        url: post.url,
      }

      const tmp = await updatePost(data)
      if (tmp) post = tmp

      expect(post).toMatchObject(data)
    })
  })

  describe('Delete', () => {
    it('Delete One', async () => {
      await deletePost(post.id)

      const postCount = await prisma.post.count()
      expect(postCount).toBe(0)
    })
  })
})