import type { PrismaClient } from '@prisma/client'

type context = {
    orm: PrismaClient
}