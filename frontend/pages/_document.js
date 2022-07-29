import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='es'>
      <Head />
      <body>
        <Main />
        <div id="modal"></div>
        <NextScript />
        <script strategy="afterInteractive" src="/scripts/dark-mode.js" />
      </body>
    </Html>
  )
}