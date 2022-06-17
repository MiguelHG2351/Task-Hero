import Layout from '../components/containers/Layout'
import { SessionProvider } from 'next-auth/react'
import '../styles/global.css'

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}