import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <script strategy="afterInteractive" src="/scripts/dark-mode.js" />
        <NextScript />
      </body>
    </Html>
  )
}