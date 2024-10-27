// Only Must have css Files will be included 
// sutch as external packages and no excape in "React IN Line css"


// Css
import '../pages/Main.css'
import "react-datepicker/dist/react-datepicker.css"
import "../components/acordione/acordione.css"
import "../components/range-elemnt/range-elemnt.css"
import "../components/calendar/calendar.css"
import '../pages-components/board/muli-css.css'

 // will move to in line 
import "../components/spining-loader/spining-loader.css"
import "../components/mongo-spinner/mongo-spinner.css"

import { SessionProvider } from "next-auth/react"
import {  StrictMode, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { WindowWidthContaxt, StateContext ,  ResolvedUserContext , FilterCityConteax , OrderContaxt} from '../context'
import State from '../state'


  //           STATE  HENDLING (update 17.8.24)
  // pages will controll state , and will  PropsOnChange CB to children FC
  // to extract State from component hendler to page hendler 
  
 // Style 

 // in line Style 

 // ther is some component that is useing Css files but will try to avoid 
 
 // I LUREND THIS PROJECT 
/*      Framer motion Lazy loading insane bundel size 
///////////////////////////////////////////////////////////////////////////
////////   If you're using a bundler like Webpack or Rollup,             /////
/// /////       we can pass a dynamic import                             /////
/// /////  domMax: This provides support for all of the above            /////
/// ///// plus pan/drag gestures and layout animations. (+25kb)          /////
 ////   In the future it might be possible to offer more granular        /////
 ///// feature packages, but for now these were chosen to reduce         /////
 /////////////////////////////////////////////////////////////////////////////
*/


export default function App({
  
  Component,
   pageProps: { session, ...pageProps },
}) {

   // global State Manged by from input see State
   const [state,setState] = useState(State)
 

   // perent was setting state but the sibling component didnt update so this was lifted to Context level 
   const [filterCity, setFilterCity] = useState(null); 


   
   // ther is no way to preserv state after page navigation , unles the component is in the same position in the react tree 
   // setting context on page navigation and clear it on component unmounte 
    const [orderContext , setOrderContext ] = useState(null)



 //  for responsive Components 
   const large = useMediaQuery('(min-width: 900px)')
   const medium = useMediaQuery('(min-width: 600px)')
   const small = useMediaQuery('(min-width : 300px)')



  return (
    <ChakraProvider value={defaultSystem}>
    <StateContext.Provider value={[state,setState]}>
      <SessionProvider session={session}>    
      <WindowWidthContaxt.Provider value={{large,medium,small}}>
      <FilterCityConteax.Provider value={[filterCity,setFilterCity]}>
      <OrderContaxt.Provider  value={[orderContext,setOrderContext]}>
          <Component {...pageProps} />
        </OrderContaxt.Provider>
      </FilterCityConteax.Provider>
      </WindowWidthContaxt.Provider>
      </SessionProvider>
      </StateContext.Provider>
      </ChakraProvider>
  )
}
   
