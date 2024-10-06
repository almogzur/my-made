import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import useUser from '../../lib/hooks/useUser'
import HCard from './h-card'
import VCard from './v-card'


const CardsWrapper=({Mode,displayCity})=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const { user, isLoading, isError } = useUser(session?.user?.email);

  useEffect(()=>{

        })

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
    <div
       style={{
        width:"100%",
        height:"80%",
        display:"flex" ,
        flexDirection: Mode === "Cards" ? "row" : "column" ,
        flexWrap:"wrap",
        marginBottom:"100px",
        marginTop:"25px",
        justifyContent:"center"      
          }}
      >

          {
      [1,2,3,4,5,6].map((item,index)=>{
         return   Mode === "Cards" ?  
               <HCard />  
              : 
              Mode === "List" ?
               <VCard/>
              :
               null
      
        })
          }
     
    </div>
  )
}

export default CardsWrapper

