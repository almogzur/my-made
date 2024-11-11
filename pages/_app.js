// Only Must have css Files will be included 
// sutch as external packages and no excape in "React IN Line css"


// Css
import '../pages/Main.css'
import "react-datepicker/dist/react-datepicker.css"

import { SessionProvider } from "next-auth/react"
import {  StrictMode , useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { WindowWidthContext, StateContext,   FilterCityContext  } from '../context'
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
   const xxl = useMediaQuery('(min-width : 1600px)')
   const xl = useMediaQuery('(min-width : 1200px)')
   const lg = useMediaQuery('(min-width: 992px)')
   const md = useMediaQuery('(min-width: 768px)')
   const sm = useMediaQuery('(min-width : 576px)')
   const xs = useMediaQuery('(min-width : 489px)')
   const xxs = useMediaQuery('(min-width : 310px)')



  return (
    <ChakraProvider value={defaultSystem}>
    <StateContext.Provider value={[state,setState]}>
      <SessionProvider session={session}>    
      <WindowWidthContext.Provider value={{xxl,xl,lg,md,sm,xs,xxs}}>
      <FilterCityContext.Provider value={[filterCity,setFilterCity]}>
          <Component {...pageProps} />
      </FilterCityContext.Provider>
      </WindowWidthContext.Provider>
      </SessionProvider>
      </StateContext.Provider>
      </ChakraProvider>
  )
}
   
