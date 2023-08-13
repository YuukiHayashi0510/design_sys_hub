import { Post } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import { getServerSession } from 'next-auth'
import { prismaErrorHandler } from '~/lib/prisma'
import { PostWithUser } from '~/types/post'
import { deletePost, findPostById, updatePost } from './service'
import { isUpdatePostData } from './validate'

// Read(GET), Update(PUT), Delete(DELETE)
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET' && req.method !== 'PUT' && req.method !== 'DELETE')
    return res.status(HttpStatusCode.MethodNotAllowed).json({
      statusCode: HttpStatusCode.MethodNotAllowed,
      message:
        'Method Not Allowed. Please use "GET" or "PUT" or "DELETE" method.',
    })

  switch (req.method) {
    case 'GET':
      return await readById(req, res)
    case 'PUT':
      return await updateById(req, res)
    case 'DELETE':
      return await deleteById(req, res)
  }
}

const readById = async (
  req: NextApiRequest,
  res: NextApiResponse<PostWithUser | ApiError>,
) => {
  const { id } = req.query
  if (typeof id !== 'string')
    return res.status(HttpStatusCode.BadRequest).json({
      statusCode: HttpStatusCode.BadRequest,
      message: 'Validation Error: ID is not String.',
    })

  try {
    const session = await getServerSession()
    if (!session || !session.user)
      return res.status(HttpStatusCode.Unauthorized).json({
        statusCode: HttpStatusCode.Unauthorized,
        message: 'Unauthorized.',
      })

    const post = await findPostById(id)
    if (post) return res.status(HttpStatusCode.Ok).json(post)

    return res.status(HttpStatusCode.NotFound).json({
      statusCode: HttpStatusCode.NotFound,
      message: 'Post is not found.',
    })
  } catch (err) {
    prismaErrorHandler(err)
  }
}

const updateById = async (
  req: NextApiRequest,
  res: NextApiResponse<Post | ApiError>,
) => {
  const data = req.body
  if (!isUpdatePostData(data))
    return res.status(HttpStatusCode.BadRequest).json({
      statusCode: HttpStatusCode.BadRequest,
      message: 'Validation Error: Request Body is not UpdatePostData.',
    })

  try {
    const session = await getServerSession()
    if (!session || !session.user)
      return res.status(HttpStatusCode.Unauthorized).json({
        statusCode: HttpStatusCode.Unauthorized,
        message: 'Unauthorized.',
      })

    const post = await updatePost(data)
    return res.status(HttpStatusCode.Ok).json(post)
  } catch (err) {
    prismaErrorHandler(err)
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
    const session = await getServerSession()
    if (!session || !session.user)
      return res.status(HttpStatusCode.Unauthorized).json({
        statusCode: HttpStatusCode.Unauthorized,
        message: 'Unauthorized.',
      })

    const post = await deletePost(id)
    return res.status(HttpStatusCode.Ok).json(post)
  } catch (err) {
    prismaErrorHandler(err)
  }
}