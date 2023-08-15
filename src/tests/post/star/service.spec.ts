import { Post, User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import prisma, { cleanUpDatabase } from '~/lib/prisma'
import { createStar, deleteStar } from '~/pages/api/post/[post_id]/star/service'
import { CreateStarData } from '~/types/api/post/star'

describe('Star Service Test', () => {
  let user: User
  let post: Post
  let user2: User
  let post2: Post

  async function createData() {
    user = await prisma.user.create({ data: { name: 'test user' } })
    user2 = await prisma.user.create({ data: { name: 'test user2' } })

    post = await prisma.post.create({
      data: {
        name: 'test1',
        description: 'test1 description',
        image: 'test1 image',
        url: 'test1 url',
        userId: user.id,
      },
    })

    post2 = await prisma.post.create({
      data: {
        name: 'test2',
        description: 'test2 description',
        image: 'test2 image',
        url: 'test2 url',
        userId: user2.id,
      },
    })
  }

  beforeEach(async () => {
    await cleanUpDatabase()
    await createData()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('Create', () => {
    it('Success', async () => {
      const data: CreateStarData = {
        postId: post.id,
        userId: user.id,
      }
      await createStar(data)

      const testUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: { stars: true },
      })

      expect(testUser?.stars.length).toBe(1)
    })

    it('ユーザは1つの投稿に1回しかスターできない', async () => {
      const data: CreateStarData = {
        postId: post.id,
        userId: user.id,
      }
      await createStar(data)

      await expect(createStar(data)).rejects.toThrowError(
        PrismaClientKnownRequestError,
      )
    })

    it('異なるユーザーであれば1つの投稿に複数のスター可能', async () => {
      const data: CreateStarData = {
        postId: post.id,
        userId: user.id,
      }
      await createStar(data)

      const data2 = {
        postId: post.id,
        userId: user2.id,
      }
      await createStar(data2)

      const p = await prisma.post.findUnique({
        where: { id: post.id },
        include: { _count: { select: { stars: true } } },
      })

      expect(p?._count.stars).toBe(2)
    })

    it('同じユーザーでも投稿が異なれば複数のスター可能', async () => {
      const data: CreateStarData = {
        postId: post.id,
        userId: user.id,
      }
      await createStar(data)

      const data2 = {
        postId: post2.id,
        userId: user.id,
      }
      await createStar(data2)

      const p = await prisma.user.findUnique({
        where: { id: user.id },
        include: { _count: { select: { stars: true } } },
      })

      expect(p?._count.stars).toBe(2)
    })
  })

  describe('Delete', () => {
    it('Success', async () => {
      const data: CreateStarData = {
        postId: post.id,
        userId: user.id,
      }
      const star = await createStar(data)

      await deleteStar(star.id)

      const testUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: { _count: { select: { stars: true } } },
      })

      expect(testUser?._count.stars).toBe(0)
    })

    it('投稿削除時に一緒に消える', async () => {
      const data: CreateStarData = {
        postId: post2.id,
        userId: user.id,
      }
      await createStar(data)

      await prisma.post.delete({ where: { id: post2.id } })

      const testUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: { _count: { select: { stars: true } } },
      })

      expect(testUser?._count.stars).toBe(0)
    })

    it('ユーザー削除時に一緒に消える', async () => {
      const data: CreateStarData = {
        postId: post.id,
        userId: user2.id,
      }
      await createStar(data)

      await prisma.user.delete({ where: { id: user2.id } })

      const p = await prisma.post.findUnique({
        where: { id: post.id },
        include: { _count: { select: { stars: true } } },
      })

      expect(p?._count.stars).toBe(0)
    })
  })
})
