import prisma from '~/lib/prisma'
import { CreateStarData } from '~/types/api/post/star'

export async function createStar(data: CreateStarData) {
  return await prisma.star.create({ data })
}

export async function deleteStar(id: string) {
  return await prisma.star.delete({ where: { id } })
}
