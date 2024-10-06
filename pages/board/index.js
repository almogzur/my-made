//// BORDE PAGE 
//// BORDE PAGE 
//// BORDE PAGE 
//// BORDE PAGE 
//// BORDE PAGE 
//// BORDE PAGE 
//// BORDE PAGE 
//// BORDE PAGE 
//// BORDE PAGE 


import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import AppHead from '../../components/app-head/app-head'
import Footer from '../../components/footer/app-footer'
import BoardToolsBar from '../../pages-components/board/board-tools-bar'
import useUser from '../../lib/hooks/useUser'
import Colors from '../../lib/colors'
import Link from 'next/link'
import Image from 'next/image'
import CardsWrapper from '../../pages-components/board/orders-wrapper'
import useOrders from '../../lib/hooks/useOrders'

const BoardPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const { user, isLoading, isError } = useUser(session?.user?.email);
  const [ Mode , setMode ] = useState("Cards")
  const  [ displayCity , setDisplayCity] = useState("")
  const cityOrders = useOrders(displayCity)

  useEffect(()=>{})

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
    <>
    <AppHead/>
     <BoardToolsBar 
        Mode={Mode}
        setMode={setMode}
        displayCity={displayCity}
        setDisplayCity={setDisplayCity}
      />
     <CardsWrapper
        Mode={Mode}
        displayCity={displayCity}
          
      />

    <Footer>
      <div //profile Link
           style={{
             marginTop:"3px",
             borderRadius: "5px",
             height: "50px",
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'center',
             alignItems: 'center',
             alignContent: 'center',
             background: Colors.d,
             width:"70px",
            
           }}

         >
           <Link href={"/profile"} shallow={true}>
             <Image
               src={session?.user?.image}
               height={40}
               width={40}
               style={{ borderRadius: "15px" }}
               alt="User Profile Link"
               fetchPriority="auto"
             />
           </Link>

     </div>
    </Footer>       
    </>
) 
}

export default BoardPage