import prisma from '~/lib/prisma'
import { CreatePostData, UpdatePostData } from '~/types/post'

// Create
export async function createPost(data: CreatePostData) {
  return await prisma.post.create({ data })
}

// Read
export async function findPostAll() {
  return await prisma.post.findMany()
}

export async function findPostById(id: string) {
  return await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  })
}

// Update
export async function updatePost(data: UpdatePostData) {
  return await prisma.post.update({
    where: {
      id: data.id,
    },
    data,
  })
}

// Delete
export async function deletePost(id: string) {
  return await prisma.post.delete({ where: { id } })
}