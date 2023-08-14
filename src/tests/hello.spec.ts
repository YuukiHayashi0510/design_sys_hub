import { testApiHandler } from 'next-test-api-route-handler'
import handler from '~/pages/api/hello.api'

describe('Hello API Test', () => {
  const url = '/api/hello'

  it('Success', async () => {
    expect.hasAssertions()
    await testApiHandler({
      requestPatcher: (req) => (req.url = url),
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' })
        const json = await res.json()

        expect(json).toEqual({ name: 'John Doe' })
      },
    })
  })
})
