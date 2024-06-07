import { SessionProvider } from "next-auth/react"
import "style/style.css"
import "style/nav.css"
import "style/ProfileControl.css"
import "style/main.css"


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
 