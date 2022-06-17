import { getProviders, signIn, getSession, getCsrfToken } from 'next-auth/react'

export default function signin({ providers }) {
  return (
    <div>
        { Object.values(providers).map(provider => {
            return (
                <div onClick={() => signIn(provider.id)} key={provider.name}>
                    <button>Sign in with {provider.name}</button>
                </div>
            )
        }) }
    </div>
  )
}

export async function getServerSideProps(context) {
    return {
        props: {
            providers: await getProviders(context)
        }
    }
}
