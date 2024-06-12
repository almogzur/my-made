import { SessionProvider } from "next-auth/react"
import "style/nav.css"
import "style/profile-control.css"
import "style/main-con.css"
import "style/vender.css"
import "style/star-rating.css"
import "style/global.css"

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
 