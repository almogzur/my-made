
// Dynamic Components
import "components/StarRating/StarRating.css"
import 'rc-select/assets/index.css'
import "components/Dialog/Dialog.css"
import "components/Acordione/Acordion.css"
import "components/CommentSection/CommentSection.css"
import "components/RangeElemnt/RangeElemnt.css"

// Static Components
import "components/Footer/Footer.css"
import "components/Loader/LoadingSpinner.css"
import "react-datepicker/dist/react-datepicker.css"
import "components/NextAuth/ProfileControl.css"

// PagesCss
import "pages/MainPage.css"
import "pages/profile/Profile.css"
import "pages/profile/costumer/customer.css"
import "pages/profile/vendor/vender.css"
import "pages/board/board.css"


import { SessionProvider } from "next-auth/react"
import { VendorContaxt,CostumrContaxt,WindowWidthContaxt,UserContaxt} from "contaxt/contaxt"
import { useEffect, useState } from "react"
import { useMediaQuery } from "usehooks-ts"


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const [Vender,setVendor]=useState({
    FullName:"",
    Phone:"",
    BussniseName:"",
    OpenDate:"",
    EndDate:"",
    Email:"",
    Payment:""
    })

  const [Customer,setCustomer] =useState({
      FullName:"",
      Phone:"",
      ApartmentRoomsSize:"",
      PriceRange:[],
      Location:""
       })

  const [User,setUser]=useState({
     CoverImg:"",
     about:"",
     phone:"",
     age:"",
     
  })
       const md = useMediaQuery('(max-width: 900px)')
       const sm = useMediaQuery('(max-width: 600px)')

    useEffect(()=>{
      console.log(Vender,User,Customer)
    },[Vender,Customer,User,session])


    
   

  return (
      <SessionProvider session={session}>
      <UserContaxt.Provider value={[User,setUser]}>
      <VendorContaxt.Provider value={[Vender,setVendor]}>
      <CostumrContaxt.Provider value={[Customer,setCustomer]}>
      <WindowWidthContaxt.Provider value={{md,sm}}>
          <Component {...pageProps} />
      </WindowWidthContaxt.Provider>
      </CostumrContaxt.Provider>
      </VendorContaxt.Provider>
      </UserContaxt.Provider>
      </SessionProvider>
  )
}
 