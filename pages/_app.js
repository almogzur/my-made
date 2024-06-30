
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
import "components/header/header.css"

// PagesCss
import "pages/MainPage.css"
import "pages/profile/Profile.css"
import "pages/Profile/customer/customer.css"
import "@pages/profile/vendor/vendor.css"
import "pages/board/board.css"
import { SessionProvider } from "next-auth/react"
import { WindowWidthContaxt, UserContext} from "Context/Context"
import { useEffect, useState } from "react"
import { useMediaQuery } from "usehooks-ts"


////////////////////////////////////////////////////////
////              STATE Paseed Throu Indexes        /////
////                To Children Component            ////
/////                                              //// 
///////////////////////////////////////////////////////
 



export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {


   const DataStructure = {
     User:{
      about:"",
      phone:"",
      age:"",
     },
     isVendor:{
        FullName:"",
        Phone:"",
        BussniseName:"",
        OpenDate:"",
        EndDate:"",
        Email:"",
        Payment:""
      },
      isCustomer: { 
        FullName:"",
        Phone:"",
        ApartmentRoomsSize:"",
        PriceRange:[],
        Location:""
      }
    ,
   }

   const [state,setState]=useState(DataStructure)


       const md = useMediaQuery('(max-width: 900px)')
       const sm = useMediaQuery('(max-width: 600px)')

    useEffect(()=>{
      console.log(state)
    },[state])


    
   

  return (

      <SessionProvider session={session}>
      <UserContext.Provider value={[state,setState]}>
      <WindowWidthContaxt.Provider value={{md,sm}}>
          <Component {...pageProps} />
      </WindowWidthContaxt.Provider>
      </UserContext.Provider>
      </SessionProvider>

  )
}
 