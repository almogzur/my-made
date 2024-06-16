import "style/footer.css"
import "style/profile-control.css"
import "style/main-con.css"
import "style/vender.css"
import "style/star-rating.css"
import "style/global.css"
import 'rc-select/assets/index.css';
import "react-datepicker/dist/react-datepicker.css";
import "style/dialog.css"
import "style/sidebar.css"
import "style/customer-form.css"

import { SessionProvider } from "next-auth/react"
import { VendorData } from "contaxt/contaxt"
import { useEffect, useState } from "react"


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

    useEffect(()=>{
        console.log(fromData)
    },[fromData])
   

  return (
    <SessionProvider session={session}>
      <VendorData.Provider value={[fromData,setFormData]}>
      <Component {...pageProps} />
      </VendorData.Provider>
    </SessionProvider>
  )
}
 