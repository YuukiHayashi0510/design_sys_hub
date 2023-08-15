import { faker } from '@faker-js/faker'
import { Post, User } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { testApiHandler } from 'next-test-api-route-handler'
import prisma, { cleanUpDatabase } from '~/lib/prisma'
import { idHandler } from '~/pages/api/post/[id].api'
import handler from '~/pages/api/post/index.api'
import { searchHandler } from '~/pages/api/post/search.api'
import { isApiError } from '~/types/api/guard'
import { UpdatePostBody } from '~/types/api/post'

// Test API
// 参考:https://qiita.com/tatsuya-miyamoto/items/f99eb069f65b30f2f816#%E5%9F%BA%E6%9C%AC%E7%B3%BB
describe('Post API Test', () => {
  let user: User
  let post: Post
  const postList: Post[] = []
  const url = '/api/post'

  async function createData() {
    const name = 'test user'
    const res = await prisma.user.findFirst({ where: { name: name } })
    if (res) user = res
    else {
      user = await prisma.user.create({
        data: {
          name,
        },
      })
    }

    for (let i = 0; i < 10; i++) {
      post = await prisma.post.create({
        data: {
          name: faker.person.fullName(),
          description: faker.lorem.sentence({ min: 3, max: 10 }),
          image: faker.image.url(),
          url: faker.internet.url(),
          userId: user.id,
        },
      })
      postList.push(post)
    }
  }

  beforeEach(async () => {
    await cleanUpDatabase()
    await createData()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('/api/post handler', () => {
    describe('ReadAll', () => {
      it('Success', async () => {
        expect.hasAssertions()
        await testApiHandler({
          requestPatcher: (req) => (req.url = url),
          handler,
          test: async ({ fetch }) => {
            const res = await fetch({ method: 'GET' })
            const json = await res.json()

            expect(json.length).toBe(10)
          },
        })
      })
    })

    describe('CreateOne', () => {
      it('Success', async () => {
        expect.hasAssertions()

        const data = {
          name: 'Create',
          description: 'Create One Description',
          image: 'Create Image',
          url: 'Create Url',
          userId: user.id,
        }

        await testApiHandler({
          requestPatcher: (req) => (req.url = url),
          handler,
          test: async ({ fetch }) => {
            const res = await fetch({
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(data),
            })
            const json = await res.json()

            expect(json).toMatchObject(data)
          },
        })
      })

      it('Validation Error: Body', async () => {
        const data = {
          name: 'Create',
          description: 'Create One Description',
          image: 'Create Image',
          url: 'Create Url',
        }

        await testApiHandler({
          requestPatcher: (req) => (req.url = url),
          handler,
          test: async ({ fetch }) => {
            const res = await fetch({
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(data),
            })
            const json = await res.json()

            expect(json).toEqual({
              statusCode: HttpStatusCode.BadRequest,
              message: 'Validation Error: Request Body is not CreatePostData.',
            })
          },
        })
      })
    })
  })

  describe('/api/post/:id handler', () => {
    describe('Read By ID', () => {
      it('Success', async () => {
        expect.hasAssertions()

        await testApiHandler({
          requestPatcher: (req) => (req.url = url),
          params: { id: post.id },
          handler: idHandler,
          test: async ({ fetch }) => {
            const res = await fetch({
              method: 'GET',
            })
            const json = await res.json()

            expect(json.name).toBe(post.name)
            expect(json.description).toBe(post.description)
            expect(json.image).toBe(post.image)
            expect(json.url).toBe(post.url)
            expect(json.userId).toBe(post.userId)
          },
        })
      })

      it('Query Validation Error: ID is String Array', async () => {
        expect.hasAssertions()

        await testApiHandler({
          requestPatcher: (req) => (req.url = url),
          params: { id: ['1', '2', '3', '4'] },
          handler: idHandler,
          test: async ({ fetch }) => {
            const res = await fetch({
              method: 'GET',
            })
            const json = await res.json()

            expect(json).toEqual({
              statusCode: HttpStatusCode.BadRequest,
              message: 'Validation Error: ID is not String.',
            })
          },
        })
      })

      it('Post Not Found', async () => {
        expect.hasAssertions()

        await testApiHandler({
          requestPatcher: (req) => (req.url = url),
          params: { id: '12' },
          handler: idHandler,
          test: async ({ fetch }) => {
            const res = await fetch({
              method: 'GET',
            })
            const json = await res.json()

            expect(json).toEqual({
              statusCode: HttpStatusCode.NotFound,
              message: 'Post is not found.',
            })
          },
        })
      })
    })

    describe('Update By ID', () => {
      it('Success', async () => {
        expect.hasAssertions()
        const body: UpdatePostBody = {
          name: faker.person.fullName(),
          description: faker.lorem.sentence({ min: 3, max: 10 }),
          image: faker.image.url(),
          url: faker.internet.url(),
        }

        await testApiHandler({
          requestPatcher: (req) => (req.url = url),
          params: { id: post.id },
          handler: idHandler,
          test: async ({ fetch }) => {
            const res = await fetch({
              method: 'PUT',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(body),
            })
            const json = await res.json()

            expect(json.name).toBe(body.name)
            expect(json.description).toBe(body.description)
            expect(json.image).toBe(body.image)
            expect(json.url).toBe(body.url)
          },
        })
      })

      it('Validation Error: Body', async () => {
        expect.hasAssertions()
        const body = {
          name: faker.person.fullName(),
          description: faker.lorem.sentence({ min: 3, max: 10 }),
          image: faker.image.url(),
        }

        await testApiHandler({
          requestPatcher: (req) => (req.url = url),
          params: { id: post.id },
          handler: idHandler,
          test: async ({ fetch }) => {
            const res = await fetch({
              method: 'PUT',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(body),
            })
            const json = await res.json()

            expect(json).toEqual({
              statusCode: HttpStatusCode.BadRequest,
              message: 'Validation Error: Request Body is not UpdatePostData.',
            })
          },
        })
      })
    })

    describe('Delete By ID', () => {
      it('Success', async () => {
        expect.hasAssertions()

        await testApiHandler({
          requestPatcher: (req) => (req.url = url),
          params: { id: post.id },
          handler: idHandler,
          test: async ({ fetch }) => {
            const res = await fetch({
              method: 'DELETE',
              headers: {
                'content-type': 'application/json',
              },
            })
            const json = await res.json()

            expect(json.name).toBe(post.name)
            expect(json.description).toBe(post.description)
            expect(json.image).toBe(post.image)
            expect(json.url).toBe(post.url)
            expect(json.userId).toBe(post.userId)
          },
        })
      })

      it('Query Validation Error: ID is String Array', async () => {
        expect.hasAssertions()

        await testApiHandler({
          requestPatcher: (req) => (req.url = url),
          params: { id: ['1', '2', '3', '4'] },
          handler: idHandler,
          test: async ({ fetch }) => {
            const res = await fetch({
              method: 'DELETE',
              headers: {
                'content-type': 'application/json',
              },
            })
            const json = await res.json()

            expect(json).toEqual({
              statusCode: HttpStatusCode.BadRequest,
              message: 'Validation Error: ID is not String.',
            })
          },
        })
      })
    })
  })

  describe('/api/post/search handler', () => {
    const url = '/api/post/search'

    describe('Keyword Search', () => {
      describe('Success', () => {
        it('Search By Name', async () => {
          const keyword = post.name

          await testApiHandler({
            requestPatcher: (req) => (req.url = url),
            params: { keyword: keyword },
            handler: searchHandler,
            test: async ({ fetch }) => {
              const res = await fetch({
                method: 'GET',
              })
              const json = await res.json()
              if (isApiError(json)) return

              expect(json.length).toBe(1)
            },
          })
        })

        it('Search By Description', async () => {
          const keyword = post.description

          await testApiHandler({
            requestPatcher: (req) => (req.url = url),
            params: { keyword: keyword },
            handler: searchHandler,
            test: async ({ fetch }) => {
              const res = await fetch({
                method: 'GET',
              })
              const json = await res.json()
              if (!(json instanceof Array)) return

              expect(json.length).toBe(1)
            },
          })
        })

        it('Keyword Post is None', async () => {
          const keyword = 'Keyword'
          expect.hasAssertions()

          await testApiHandler({
            requestPatcher: (req) => (req.url = url),
            params: { keyword: keyword },
            handler: searchHandler,
            test: async ({ fetch }) => {
              const res = await fetch({
                method: 'GET',
              })
              const json = await res.json()
              if (!(json instanceof Array)) return

              expect(json.length).toBe(0)
            },
          })
        })
      })

      describe('Failure', () => {
        it('Method Not Allowed', async () => {
          const keyword = post.name

          await testApiHandler({
            requestPatcher: (req) => (req.url = url),
            params: { keyword: keyword },
            handler: searchHandler,
            test: async ({ fetch }) => {
              const res = await fetch({
                method: 'POST',
              })
              const json = await res.json()
              if (!isApiError(json)) return

              expect(json).toEqual({
                statusCode: HttpStatusCode.MethodNotAllowed,
                message: 'Method Not Allowed. Please use "GET" method.',
              })
            },
          })
        })

        it('Keyword Validation Error', async () => {
          const keyword = ['', '', '']

          await testApiHandler({
            requestPatcher: (req) => (req.url = url),
            params: { keyword: keyword },
            handler: searchHandler,
            test: async ({ fetch }) => {
              const res = await fetch({
                method: 'GET',
              })
              const json = await res.json()
              if (!isApiError(json)) return

              expect(json).toEqual({
                statusCode: HttpStatusCode.BadRequest,
                message: 'Validation Error: Keyword Query is not String.',
              })
            },
          })
        })
      })
    })
  })
})
