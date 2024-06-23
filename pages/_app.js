import "components/Footer/footer.css"
import "components/NextAuth/ProfileControl.css"
import "pages/MainPage.css"
import "pages/vendor/vender.css"
import "components/StarRating/StarRating.css"
import 'rc-select/assets/index.css';
import "react-datepicker/dist/react-datepicker.css";
import "components/Dialog/Dialog.css"
import "components/Sidebar/SideBar.css"
import "pages/costumer/customer.css"
import "components/Acordione/Acordion.css"
import "components/CommentSection/CommentSection.css"
import "components/Loader/LoadingSpinner.css"

import { SessionProvider } from "next-auth/react"
import { VendorData } from "contaxt/contaxt"
import { useEffect, useState } from "react"


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const [VenderData,setVendorData]=useState({
    venderFullName:"",
    venderPhone:"",
    venderBussniseName:"",
    venderOpenDate:"",
    venderEndDate:"",
    vendorEmail:"",
    vendorPaymentOptions:""
    })

    const [CustomerData,setCustomerDats] =useState({
      customerFullName:"",
      customerPhoneNumber:"",
      customerApartmentSizw:"",
      customer:"",
      customer:"" ,

       })

    useEffect(()=>{
       // console.log(VenderData,CustomerData)
    },[VenderData,CustomerData])


    
   

  return (
    <SessionProvider session={session}>
      <VendorData.Provider value={[VenderData,setVendorData]}>
      <Component {...pageProps} />
      </VendorData.Provider>
    </SessionProvider>
  )
}
 