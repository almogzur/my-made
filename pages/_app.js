
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
import "components/MongoSpinner/mongoSpinner.css"

// PagesCss
import "pages/MainPage.css"
import "pages/profile/Profile.css"
import "pages/Profile/customer/customer.css"
import "@pages/profile/vendor/vendor.css"
import "pages/board/board.css"
import { SessionProvider } from "next-auth/react"
import { WindowWidthContaxt, UserContext,ColorsContext} from "Context/Context"
import { useEffect, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import State from "@/lib/State"

  //           STATE  HENDLING
////////////////////////////////////////////////////////
// /              hooks ! in component !              /////
  ////////////////////////////////////////////////////////

 //              STYLE 
//////////////////////////////////////////////////////////////////////////
////  5.7.24 idea come to me imgona switch all css files  with     /// ///////
////      framer mothen curosponding style elements More at           ///////////
///////////////////////////////////////////////////////////////////////////////////

/*      Framer motion Lazy loading insane bundel size if not 
///////////////////////////////////////////////////////////////////////////
////////   If you're using a bundler like Webpack or Rollup,             /////
/// /////       we can pass a dynamic import                             /////
/// /////  domMax: This provides support for all of the above            /////
/// ///// plus pan/drag gestures and layout animations. (+25kb)          /////
 //// In the future it might be possible to offer more granular    /////
 ///// feature packages, but for now these were chosen to reduce      /////
 ////   the amount of duplication between features, which could result/////
 /////      in much more data being downloaded ultimately.          /////
/////          #Synchronous loading                                   /////
/////    By passing one of these feature packages to LazyMotion, they'll /////
/////        be bundled into your main JavaScript bundle.            /////
///////////////////////////////////////////////////////////////////////////
*/


/*   LINKS
 ///////////////////////////////////////////////////////////////////////////////
/////        refetching happens when a <Link /> component enters the          /////
 /////        user's viewport (initially or through scroll). Next.js          /////
 /////        prefetches and loads the linked route (denoted by the href)       /////
/////         and its data in the background to improve the performance of    /////
 /////         client-side
 ///////////////////////////////////////////////////////////////////////////////
*/

/* Dynamic Import  6/7/24
  ///////////////////////////////////////////////////////////////////////////////

 ////     Funny story. Last night at 01:00 pm   ////////
 //   I didn't notice and activated CHROME throttling ////////
 //.to 3G low, and my Profile page was taking 50 sec  ////////
 ///to load I was sure that the performance was       ////////
  //// coming from Framer-Motion Overloading webPack  ////////
  //                   Watch                          /////// 
  // https://www.framer.com/motion/guide-reduce-bundle-size/ ///
  //// so I switched to m component and LazyLoading  ////
  ////  which did  improv the bundle by 4K line      ////
  ///// HOLY SHITTT !!!! But Loading was 30 Sec so   ////
  ////  I hope in dynamic importing  and drop it by 30% to ///
  ////  about 20 sec and I watch how next injects    //////
  ////     the dynamic scrips I  fall in love        //////
  ////// and from now on every component!!!    ///////
  //      Cant use Hooks in dynamic import            //////  
///////////////////////////////////////////////////////////*/
  



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
   
