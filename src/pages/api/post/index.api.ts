import { Post } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import { prismaErrorHandler } from '~/lib/prisma'
import { createPost, findPostAll } from './service'
import { isCreatePostData } from './validate'

// Index(GET), Create(POST)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET' && req.method !== 'POST')
    return res.status(HttpStatusCode.MethodNotAllowed).json({
      statusCode: HttpStatusCode.MethodNotAllowed,
      message: 'Method Not Allowed. Please use "GET" or "POST" method.',
    })

  switch (req.method) {
    case 'GET':
      return await readAll(res)
    case 'POST':
      return await createOne(req, res)
  }
}

const readAll = async (res: NextApiResponse<Post[] | ApiError>) => {
  try {
    const allPosts = await findPostAll()
    return res.status(HttpStatusCode.Ok).json(allPosts)
  } catch (err) {
    prismaErrorHandler(err)
  }
}

const createOne = async (
  req: NextApiRequest,
  res: NextApiResponse<Post | ApiError>,
) => {
  const data = req.body
  if (!isCreatePostData(data))
    return res.status(HttpStatusCode.BadRequest).json({
      statusCode: HttpStatusCode.BadRequest,
      message: 'Validation Error: Request Body is not CreatePostData.',
    })

  try {
    const post = await createPost(data)
    return res.status(HttpStatusCode.Created).json(post)
  } catch (err) {
    prismaErrorHandler(err)
  }
}
