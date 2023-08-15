// ApiErrorをそのまま使えなかったため、強制的にアンビエント宣言
declare module 'next/dist/server/api-utils' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ApiError {
    statusCode: number
    message: string
  }
}
