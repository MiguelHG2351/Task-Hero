import { GraphQLScalarType, Kind } from 'graphql'

export const DateTime = new GraphQLScalarType({
    name: 'DateTime',
    description: 'DateTime custom scalar type',
    parseValue(value: any) {
        return new Date(value) // value from the client, Convert outgoing Date to ISOString for JSON
    },
    serialize(value: any) {
        return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value) // ast value is always in string format
        }
        return null
    },
    
})
