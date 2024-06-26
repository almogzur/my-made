
// Dynamic Components
import "components/StarRating/StarRating.css"
import 'rc-select/assets/index.css';
import "components/Dialog/Dialog.css"
import "components/Acordione/Acordion.css"
import "components/CommentSection/CommentSection.css"

// Static Components
import "components/Footer/Footer.css"
import "components/Loader/LoadingSpinner.css"
import "react-datepicker/dist/react-datepicker.css";
import "components/NextAuth/ProfileControl.css"


// PagesCss
import "pages/MainPage.css"
import "pages/profile/Profile.css"
import "pages/profile/costumer/customer.css"
import "pages/profile/vendor/vender.css"
import "pages/board/board.css"


import { SessionProvider } from "next-auth/react"
import { VendorData,CostumrData,PageWidth } from "contaxt/contaxt"
import { useEffect, useState } from "react"
import { useMediaQuery } from "usehooks-ts"


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


       const md = useMediaQuery('(max-width: 900px)')
       const sm = useMediaQuery('(max-width: 600px)')

    useEffect(()=>{
    },[VenderData,CustomerData])


    
   

  return (
    <SessionProvider session={session}>
      <VendorData.Provider value={[VenderData,setVendorData]}>
      <CostumrData.Provider value={[CostumrData,setCustomerDats]}>
      <PageWidth.Provider value={[md,sm]}>
      <Component {...pageProps} />
      </PageWidth.Provider>
      </CostumrData.Provider>
      </VendorData.Provider>
    </SessionProvider>
  )
}
 