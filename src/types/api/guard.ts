import { ApiError } from 'next/dist/server/api-utils'

export const isApiError = (json: unknown): json is ApiError => {
  return (
    !!json &&
    typeof json === 'object' &&
    'statusCode' in json &&
    'message' in json
  )
}
