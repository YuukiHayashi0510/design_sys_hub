import { Post, User } from '@prisma/client'
import prisma, { cleanUpDatabase } from '~/lib/prisma'
import {
  createPost,
  deletePost,
  findPostAll,
  findPostById,
  updatePost,
} from '~/pages/api/post'
import { CreatePostData, UpdatePostData } from '~/types/post'

let post: Post
let user: User

async function createData() {
  const name = 'test user'
  user = await prisma.user.create({
    data: {
      name,
    },
  })

  post = await prisma.post.create({
    data: {
      name: 'test',
      description: '',
      url: '',
      image: '',
      userId: user.id,
    },
  })
}

beforeEach(async () => {
  await cleanUpDatabase()
  await createData()
})

afterAll(async () => {
  prisma.$disconnect()
})

describe('Create', () => {
  it('Create One Success', async () => {
    const data: CreatePostData = {
      name: '',
      description: '',
      url: '',
      image: '',
      userId: user.id,
    }
    post = await createPost(data)

    expect(post).toMatchObject(data)
  })
})

describe('Read', () => {
  it('Read All', async () => {
    const count = await prisma.post.count()
    const allPosts = await findPostAll()

    expect(allPosts.length).toBe(count)
  })

  it('Find by ID', async () => {
    const res = await findPostById(post.id)
    expect(res).toMatchObject(post)
  })
})

describe('Update', () => {
  it('Update One', async () => {
    const data: UpdatePostData = {
      id: post.id,
      name: 'update',
      description: post.description,
      image: post.image,
      url: post.url,
    }

    post = await updatePost(data)

    expect(post).toMatchObject(data)
  })
})

describe('Delete', () => {
  it('Delete One', async () => {
    await deletePost(post.id)

    const postCount = await prisma.post.count()
    expect(postCount).toBe(0)
  })
})
