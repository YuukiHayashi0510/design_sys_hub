import { HttpStatusCode } from 'axios'
import { testApiHandler } from 'next-test-api-route-handler'
import handler from '~/pages/api/ogp/index.api'

describe('OGP API Test', () => {
  const url = '/api/ogp'

  describe('Get OGP Info', () => {
    it('Success', async () => {
      const ogpUrl = 'https://qiita.com/t-toyota/items/93cce73004b9f765cfcf'

      await testApiHandler({
        requestPatcher: (req) => (req.url = url),
        handler,
        params: { url: ogpUrl },
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' })
          const json = await res.json()

          expect(json).toHaveProperty('type')
          expect(json).toHaveProperty('image')
          expect(json).toHaveProperty('url')
        },
      })
    })

    it('Validation Error: Invalid Url', async () => {
      const invalidUrl = 'aaaaa'
      await testApiHandler({
        requestPatcher: (req) => (req.url = url),
        handler,
        params: { url: invalidUrl },
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' })
          const json = await res.json()

          expect(json).not.toHaveProperty('type')
          expect(json).not.toHaveProperty('image')
          expect(json).not.toHaveProperty('url')

          expect(json).toEqual({
            statusCode: HttpStatusCode.BadRequest,
            message: 'Validation Error: Url is invalid.',
          })
        },
      })
    })
  })
})
