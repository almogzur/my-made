
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
import State from "@/lib/State"

  //           STATE  HENDLING
////////////////////////////////////////////////////////
////              STATE Paseed Throu Pages Indexes //////
////["/profile","/profile/vendor",/profile/customer] /////
////         To Children Component and so ON          ////
////   Clear Component Hierarchy: Props are suitable   ///
////   ifthe data flow in your component hierarchy is  /////
////   simple and clear. Each component explicitly   //////
////   receives the data it needs, which makes it   /////
////        easier to understand and debug.          ////
//// Component Reusability: Passing props makes your ////
//// components more reusable and flexible since they ////
////  don't depend on the global state provided by /////
////  context.  Predictable State Updates: With props,////
//// state updates are more predictable since they ////
//// follow a clear data flow from parent to     ////
////               child components.              ////
////    Performance: Passing props can be more  ////
////  efficient in some cases, as it avoids      ////
////                re-rendering                  ////
///// components that do not need the updated   //// 
////   context values. However, extensive prop  ////
//// drilling can also lead to performance issues
////                                             //// 
///////////////////////////////////////////////////////
 
           const getData = async (URL) => {
             try {
                 const response = await fetch(URL);
                    if (!response.ok) {
                     throw new Error(`Response status: ${response.status}`);
}

                 const json = await response.json();
                 console.log(json);
}
            catch (error) {
               console.error(error.message);
}
}

export default function App({
  
  Component,
   pageProps: { session, ...pageProps },
}) {

   const [state,setState] = useState(State)
   const md = useMediaQuery('(max-width: 900px)')
   const sm = useMediaQuery('(max-width: 600px)')


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
   
