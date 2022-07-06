import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import http from 'http'
import path from 'path'
import { readFileSync } from 'fs'
import resolvers from './resolvers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const typeDefs = readFileSync(
    path.join(__dirname, 'models', 'schema.graphql'),
    {
        encoding: 'utf-8'
    }
)

const port = process.env.PORT ?? 4000

export default async function app() {
    const { app } = await import('./server')
    const httpServer = http.createServer(app)
    
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            console.log('req user: ', req.user)
            
            return {
                orm: prisma,
                user: req.user
            }
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer})
        ]
    })

    await server.start()

    server.applyMiddleware({
        app,
        path: '/graphql'
    })

    await new Promise<void>(resolve => httpServer.listen({ port }, resolve))
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
}
