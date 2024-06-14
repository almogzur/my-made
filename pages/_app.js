import { SessionProvider } from "next-auth/react"
import { VendorData } from "contaxt/contaxt"
import { useState } from "react"
import "style/footer.css"
import "style/profile-control.css"
import "style/main-con.css"
import "style/vender.css"
import "style/star-rating.css"
import "style/global.css"
import 'rc-select/assets/index.css';
import "react-datepicker/dist/react-datepicker.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const [fromData,setFormData]=useState({
    venderFullName:"",
    venderPhone:"",
    venderBussniseName:"",
    venderOpenDate:"",
    venderEndDate:"",
    vendorEmail:"",
    vendorPaymentOptions:""
    })
   

  return (
    <SessionProvider session={session}>
      <VendorData.Provider value={[fromData,setFormData]}>
      <Component {...pageProps} />
      </VendorData.Provider>
    </SessionProvider>
  )
}
 