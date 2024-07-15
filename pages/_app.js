// Only Must have css Files will be included 
// sutch as external packages and no excape in "React IN Line css"


// Css
import '../pages/Main.css'
import 'rc-select/assets/index.css'
import "react-datepicker/dist/react-datepicker.css"
import "../components/acordione/acordione.css"
import "../components/range-elemnt/range-elemnt.css"
import "../components/calendar/calendar.css"
 // will move to in line 
import "../components/spining-loader/spining-loader.css"
import "../components/mongo-spinner/mongo-spinner.css"

import { SessionProvider } from "next-auth/react"
import { WindowWidthContaxt, StateContext} from '../context'
import {  useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import State from '../lib/state'

  //           STATE  HENDLING
////////////////////////////////////////////////////////
// / from (perent) hendle state change by pasing       ///
///      onChange callback to the component         /////
//             with children id and value           ////
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




export default function App({
  
  Component,
   pageProps: { session, ...pageProps },
}) {

   const [state,setState] = useState(State)

   const md = useMediaQuery('(max-width: 900px)')
   const sm = useMediaQuery('(max-width: 600px)')
   const [showModal, setShowModal] = useState(false);



  return (
      <SessionProvider session={session}>    
      <StateContext.Provider value={[state,setState]}>
      <WindowWidthContaxt.Provider value={{md,sm}}>
          <Component {...pageProps} />
      </WindowWidthContaxt.Provider>
      </StateContext.Provider>
      </SessionProvider>
     

  )
}
   
