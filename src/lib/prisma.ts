import { Prisma, PrismaClient } from '@prisma/client'
import {
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

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
const excludeModelNames = ['']

/**
 * データベースの全テーブルを削除する
 * @returns {Promise<number>} - 削除したテーブルの数
 */
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

/**
 * Prisma Error Handling
 * @param err
 * @returns {ApiError} - { statusCode: number, message: string }
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/handling-errors
 */
export function prismaErrorHandler(err: unknown): ApiError {
  if (err instanceof Prisma.PrismaClientKnownRequestError)
    return {
      statusCode: HttpStatusCode.BadRequest,
      message: `Bad Request: ${err.cause}`,
    }
  else if (err instanceof PrismaClientValidationError)
    return {
      statusCode: HttpStatusCode.BadRequest,
      message: `Validation Error: ${err.cause}`,
    }
  else if (
    err instanceof PrismaClientUnknownRequestError ||
    err instanceof PrismaClientRustPanicError ||
    err instanceof PrismaClientInitializationError
  )
    return {
      statusCode: HttpStatusCode.InternalServerError,
      message: `Internal Server Error: ${err.cause}`,
    }

  return {
    statusCode: HttpStatusCode.InternalServerError,
    message: `${err}`,
  }
}
