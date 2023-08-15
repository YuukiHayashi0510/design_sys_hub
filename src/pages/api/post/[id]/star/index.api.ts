import { HttpStatusCode } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import { prismaErrorHandler } from '~/lib/prisma'
import { createStar } from './service'

type Data = {
  starCount: number
}

// Create(POST), star押した後にstar数を返す
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ApiError>,
) {
  if (req.method !== 'POST')
    return res.status(HttpStatusCode.MethodNotAllowed).json({
      statusCode: HttpStatusCode.MethodNotAllowed,
      message: 'Method Not Allowed. Please use "POST" method.',
    })

  const { id: postId } = req.query
  if (typeof postId !== 'string')
    return res.status(HttpStatusCode.BadRequest).json({
      statusCode: HttpStatusCode.BadRequest,
      message: 'Validation Error: ID is not String.',
    })

  // NextAuthのsessionの取得方法とテスト時のログイン方法がわからないので、userIdをbodyでもらう
  const { userId } = req.body
  if (typeof userId !== 'string')
    return res.status(HttpStatusCode.BadRequest).json({
      statusCode: HttpStatusCode.BadRequest,
      message: 'Validation Error: User ID is not String.',
    })

  try {
    const star = await createStar({ postId, userId })
    res
      .status(HttpStatusCode.Created)
      .json({ starCount: star.post._count.stars })
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json(prismaErrorHandler(err))
  }
}
