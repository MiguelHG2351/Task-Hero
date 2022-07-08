import Head from 'next/head'
import { getSession } from 'next-auth/react'
export default function Home() {
    return (
        <>
            <Head>
                <title>Validando.....</title>
            </Head>
        </>
    )
}


export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })

    if(!session) {
        return {
            redirect: { destination: '/auth/signin' }
        }
    } else {
        return {
            redirect: { destination: '/u' }
        }
    }
}
