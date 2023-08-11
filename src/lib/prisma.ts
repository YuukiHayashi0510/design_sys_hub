import { Prisma, PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient
  }
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient()
  }
  prisma = globalWithPrisma.prisma
}

export default prisma

// cleanUp不要なテーブル名
const excludeModelNames = ['Health']

export async function cleanUpDatabase(): Promise<number> {
  const modelNames = Prisma.dmmf.datamodel.models
    .map((model) => model.name)
    .filter((modelName) => !excludeModelNames.includes(modelName))

  await prisma.$transaction(
    modelNames.map((model) =>
      prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "${model}" RESTART IDENTITY CASCADE;`,
      ),
    ),
  )
  prisma.$disconnect()

  return modelNames.length
}
