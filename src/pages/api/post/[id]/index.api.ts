import { Post } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import { prismaErrorHandler } from '~/lib/prisma'
import { UpdatePostData } from '~/types/api/post'
import { deletePost, updatePost } from '../service'
import { isUpdatePostData } from '../validate'

// Update(PUT), Delete(DELETE)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT' && req.method !== 'DELETE')
    return res.status(HttpStatusCode.MethodNotAllowed).json({
      statusCode: HttpStatusCode.MethodNotAllowed,
      message:
        'Method Not Allowed. Please use "GET" or "PUT" or "DELETE" method.',
    })

  switch (req.method) {
    case 'PUT':
      return await updateById(req, res)
    case 'DELETE':
      return await deleteById(req, res)
  }
}

const updateById = async (
  req: NextApiRequest,
  res: NextApiResponse<Post | ApiError>,
) => {
  const { id } = req.query
  const body = req.body
  const data: UpdatePostData = {
    id,
    ...body,
  }

  if (!isUpdatePostData(data))
    return res.status(HttpStatusCode.BadRequest).json({
      statusCode: HttpStatusCode.BadRequest,
      message: 'Validation Error: Request Body is not UpdatePostData.',
    })

  try {
    const post = await updatePost(data)
    res.status(HttpStatusCode.Ok).json(post)
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json(prismaErrorHandler(err))
  }
}

const deleteById = async (
  req: NextApiRequest,
  res: NextApiResponse<Post | ApiError>,
) => {
  const { id } = req.query
  if (typeof id !== 'string')
    return res.status(HttpStatusCode.BadRequest).json({
      statusCode: HttpStatusCode.BadRequest,
      message: 'Validation Error: ID is not String.',
    })

  try {
    const post = await deletePost(id)
    res.status(HttpStatusCode.Ok).json(post)
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json(prismaErrorHandler(err))
  }
}

// api.spec.tsでのimport衝突回避用
// handlerはexport defaultでなければならない
export { handler as idHandler }
