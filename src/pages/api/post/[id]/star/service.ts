import prisma from '~/lib/prisma'
import { CreateStarData } from '~/types/api/post/star'

export async function createStar(data: CreateStarData) {
  // 投稿に関するstarのカウントも返す
  return await prisma.star.create({
    data,
    include: { post: { include: { _count: { select: { stars: true } } } } },
  })
}

export async function deleteStar(id: string) {
  return await prisma.star.delete({
    where: { id },
    include: { post: { include: { _count: { select: { stars: true } } } } },
  })
}
