import { Html, Head, Main, NextScript } from 'next/document'

import AppHeader from "components/header/AppHeader"
 
export default function Document() {
  return (
    <Html lang="heb">
      <Head />
      <body>
      <AppHeader/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
