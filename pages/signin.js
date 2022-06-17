import { getProviders, signIn, getSession, getCsrfToken } from 'next-auth/react'

export default function signin({ providers }) {
  return (
    <div>
        { Object.values(providers).map(provider => {
            return (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
                </div>
            )
        }) }
    </div>
  )
}

export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })

    console.log(session)
    if(session) {
        return {
            redirect: { destination: '/' }
        }
    }
    
    return {
        props: {
            providers: await getProviders(context),
            csrfToken: await getCsrfToken(context),
        }
    }
}
