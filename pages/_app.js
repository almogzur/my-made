// Only Must have css Files will be included 
// sutch as external packages and no excape in "React IN Line css"


// Css
import '../pages/Main.css'
import "react-datepicker/dist/react-datepicker.css"
import "../components/range-elemnt/range-elemnt.css"

import { SessionProvider } from "next-auth/react"
import {  StrictMode , useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { WindowWidthContext, StateContext,   FilterCityContext , OrderContext} from '../context'
import State from '../state'



export default function App({
  
  Component,
   pageProps: { session, ...pageProps },
}) {

   
   const [state,setState] = useState(State)
 

   const [filterCity, setFilterCity] = useState(null); 

   

   // setting context on page navigation and clear when component un-mount 
    const [orderContext , setOrderContext ] = useState(null)



 //  for responsive Components 
   const xl = useMediaQuery('(min-width : 1600px)')
   const lg = useMediaQuery('(min-width: 900px)')
   const md = useMediaQuery('(min-width: 640px)')
   const sm = useMediaQuery('(min-width : 300px)')



  return (
    <ChakraProvider value={defaultSystem}>
    <StateContext.Provider value={[state,setState]}>
      <SessionProvider session={session}>    
      <WindowWidthContext.Provider value={{xl,lg,md,sm}}>
      <FilterCityContext.Provider value={[filterCity,setFilterCity]}>
      <OrderContext.Provider  value={[orderContext,setOrderContext]}>
          <Component {...pageProps} />
        </OrderContext.Provider>
      </FilterCityContext.Provider>
      </WindowWidthContext.Provider>
      </SessionProvider>
      </StateContext.Provider>
      </ChakraProvider>
  )
}
   
