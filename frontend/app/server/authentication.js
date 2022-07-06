import { getSession } from "next-auth/react"

export default async function authentication(context) {
    const { req } = context
    const session = await getSession({ req })

    return session?.user
}