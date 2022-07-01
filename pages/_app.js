import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { AnimatePresence } from "framer-motion";
import "../styles/global.css";

import store from "../lib/redux";

/**
 *
 * @param {AppProps} param0
 */
export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) {
  const url = `https://wallis.dev${router.route}`;
  return (
    <ReduxProvider store={store}>
      <SessionProvider session={session}>
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
      </SessionProvider>
    </ReduxProvider>
  );
}
