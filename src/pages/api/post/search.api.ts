import { Post } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import { prismaErrorHandler } from '~/lib/prisma'
import { searchPostByKeyword } from './service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | ApiError>,
) {
  if (req.method !== 'GET')
    return res.status(HttpStatusCode.MethodNotAllowed).json({
      statusCode: HttpStatusCode.MethodNotAllowed,
      message: 'Method Not Allowed. Please use "GET" method.',
    })

  const { keyword } = req.query
  if (typeof keyword !== 'string')
    return res.status(HttpStatusCode.BadRequest).json({
      statusCode: HttpStatusCode.BadRequest,
      message: 'Validation Error: Keyword Query is not String.',
    })

  try {
    const searchPosts = await searchPostByKeyword(keyword)
    res.status(HttpStatusCode.Ok).json(searchPosts)
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json(prismaErrorHandler(err))
  }
}

export { handler as searchHandler }
