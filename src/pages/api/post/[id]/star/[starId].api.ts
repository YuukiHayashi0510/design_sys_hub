import { HttpStatusCode } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import { prismaErrorHandler } from '~/lib/prisma'
import { deleteStar } from './service'

type Data = {
  starCount: number
}

// DELETE, 削除時にstar数を返す
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ApiError>,
) {
  if (req.method !== 'DELETE')
    return res.status(HttpStatusCode.MethodNotAllowed).json({
      statusCode: HttpStatusCode.MethodNotAllowed,
      message: 'Method Not Allowed. Please use "DELETE" method.',
    })

  const { starId } = req.query
  if (typeof starId !== 'string')
    return res.status(HttpStatusCode.BadRequest).json({
      statusCode: HttpStatusCode.BadRequest,
      message: 'Validation Error: Star ID is not String.',
    })

  try {
    const star = await deleteStar(starId)
    // * star.post._count.stars - 1 はdeleteStar()で取れるカウントが
    // * 削除前のカウントであるため
    res
      .status(HttpStatusCode.Ok)
      .json({ starCount: star.post._count.stars - 1 })
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json(prismaErrorHandler(err))
  }
}

export { handler as deleteHandler }