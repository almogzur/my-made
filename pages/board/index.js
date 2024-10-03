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
import { m ,LazyMotion} from 'framer-motion'
import { f } from '../../lib/features'
import useUser from '../../lib/hooks/useUser'
import Colors from '../../lib/colors'
import Link from 'next/link'
import Image from 'next/image'
import CardsWrapper from '../../pages-components/board/cards-wrapper'

const BoardPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const { user, isLoading, isError } = useUser(session?.user?.email);

  useEffect(()=>{

        })

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
    <>
    <AppHead/>
     <BoardToolsBar/>
     <CardsWrapper>
        {[0,1] }   
     </CardsWrapper>

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