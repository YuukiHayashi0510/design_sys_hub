import { Post, Star, User } from '@prisma/client'
import { testApiHandler } from 'next-test-api-route-handler'
import prisma, { cleanUpDatabase } from '~/lib/prisma'
import { deleteHandler } from '~/pages/api/post/[id]/star/[starId].api'
import handler from '~/pages/api/post/[id]/star/index.api'
import { isApiError } from '~/types/api/guard'

describe('Star API Test', () => {
  let user: User
  let post: Post
  let star: Star

  async function createData() {
    user = await prisma.user.create({ data: { name: 'test user' } })

    post = await prisma.post.create({
      data: {
        name: 'Test',
        description: 'this is an api test.',
        image: 'api.test.img',
        url: 'api.test.url',
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

  describe('/api/post/:id/star', () => {
    describe('Create Star', () => {
      it('Success', async () => {
        expect.hasAssertions()

        const url = '/api/post/:id/star'
        const data = {
          userId: user.id,
        }

        await testApiHandler({
          requestPatcher: (req) => (req.url = url),
          handler,
          params: { id: post.id },
          test: async ({ fetch }) => {
            const res = await fetch({
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(data),
            })
            const json = await res.json()
            if (isApiError(json)) return

            expect(json.count).toBe(1)
          },
        })
      })
    })
  })

  describe('/api/post/:id/star/:starId', () => {})

  describe('Delete Star', () => {
    it('Success', async () => {
      expect.hasAssertions()
      star = await prisma.star.create({
        data: { postId: post.id, userId: user.id },
      })

      const url = `/api/post/:id/star/:starId`

      await testApiHandler({
        requestPatcher: (req) => (req.url = url),
        handler: deleteHandler,
        params: { id: post.id, starId: star.id },
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'DELETE' })
          const json = await res.json()
          if (isApiError(json)) return

          expect(json.count).toBe(0)
        },
      })
    })
  })
})
