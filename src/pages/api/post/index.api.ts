import { Post } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import { getServerSession } from 'next-auth'
import { prismaErrorHandler } from '~/lib/prisma'
import { createPost } from './service'
import { isCreatePostData } from './validate'
import { authOptions } from '../auth/[...nextauth].api'

// Create(POST)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | ApiError>,
) {
  if (req.method !== 'POST')
    return res.status(HttpStatusCode.MethodNotAllowed).json({
      statusCode: HttpStatusCode.MethodNotAllowed,
      message: 'Method Not Allowed. Please use "GET" or "POST" method.',
    })

  const session = await getServerSession(req, res, authOptions)
  if (!session || !session.user)
    return res.status(HttpStatusCode.Unauthorized).json({
      statusCode: HttpStatusCode.Unauthorized,
      message: 'Unauthorized. You must be logged in.',
    })

  const data = req.body
  data.userId = session.user.id

  if (!isCreatePostData(data))
    return res.status(HttpStatusCode.BadRequest).json({
      statusCode: HttpStatusCode.BadRequest,
      message: 'Validation Error: Request Body is not CreatePostData.',
    })

  try {
    const post = await createPost(data)
    res.status(HttpStatusCode.Created).json(post)
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json(prismaErrorHandler(err))
  }
}
