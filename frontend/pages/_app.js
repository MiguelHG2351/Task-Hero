import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { AnimatePresence } from "framer-motion";
import "../styles/global.css";

import store from "../lib/redux";
import { useApollo } from "frontend/lib/apollo";

/**
 *
 * @param {AppProps} param0
 */
export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) {
  const url = `https://taskhero.miguel2351.me/${router.route}`;
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <ReduxProvider store={store}>
          <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}>
            {Component?.PageLayout ? (
              <Component.PageLayout>
                <Component {...pageProps} canonical={url} key={url} />
              </Component.PageLayout>
            ) : (
              <Component {...pageProps} canonical={url} key={url} />
            )}
          </AnimatePresence>
        </ReduxProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
