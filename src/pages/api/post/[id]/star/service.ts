import prisma from '~/lib/prisma'
import { CreateStarData } from '~/types/api/post/star'

export async function createStar(data: CreateStarData) {
  return await prisma.star.create({ data })
}

export async function deleteStar(id: string) {
  return await prisma.star.delete({ where: { id } })
}

// private
type HasStarData = CreateStarData

const exists = async (data: HasStarData) => {
  const starCount = await prisma.star.count({
    where: { postId: data.postId, userId: data.userId },
  })

  return starCount === 1
}
