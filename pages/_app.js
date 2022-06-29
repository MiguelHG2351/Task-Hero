import Layout from '../components/containers/Layout'
import { SessionProvider } from 'next-auth/react'
import { Provider as ReduxProvider } from 'react-redux'
import '../styles/global.css'

import store from '../lib/redux'

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  
  return (
    <ReduxProvider store={store}>
      <SessionProvider session={session}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ReduxProvider>
  )
}