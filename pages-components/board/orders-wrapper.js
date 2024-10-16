import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import useUser from '../../lib/hooks/useUser'
import HCard from '../../pages-components/board/items-display/h-card'
import VCard from '../../pages-components/board/items-display/v-card'

const OrdersWrapper=({Mode,childern})=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const { user, isLoading, isError } = useUser(session?.user?.email);

  const WrapperStyle = {
    width:"100%",
    height:"80%",
    display:"flex" ,
    flexDirection: Mode === "Cards" ? "row" : "column" ,
    flexWrap:"wrap",
    marginBottom:"100px",
    marginTop:"25px",
    justifyContent:"center"      ,
  }
    
    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

   return <div style={WrapperStyle}  
       >
         {  [1,2,3,4,5,6].map(
           (item,index) => {
             return Mode === "Cards" ?  
              <HCard key={item} />  
              :  
              <VCard  key={item}/>
   })
     }
     </div>
}

export default OrdersWrapper

