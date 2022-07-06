import { ApolloClient, InMemoryCache, HttpLink, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useMemo } from 'react'

let apolloClient

function createApolloClient() {
    const authLink =  setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNsNTF4cW1kYTAwMDA5bzRlMHJvbnh6NDgiLCJpYXQiOjE2NTY2NzQ2MTgsImV4cCI6MTY1NzUzODYxOH0.fhydN-eNt-Kykn75hANQESoS4g2VT8hEbt8NSldgyHU",
          }
        }
      });
      const httpLink = createHttpLink({
        // uri: 'https://task-hero-api.herokuapp.com/graphql',
        uri: 'http://localhost:4000/graphql',
      });

    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    })
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient()

    if (initialState) {
        const existingCache = _apolloClient.extract()

        _apolloClient.cache.restore({ ...existingCache, ...initialState })
    }

    if (typeof window === 'undefined') return _apolloClient

    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState])
    return store
}