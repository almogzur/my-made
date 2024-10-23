import { useSession } from 'next-auth/react'
import HCard from '../../pages-components/board/items-display/h-card'
import VCard from '../../pages-components/board/items-display/v-card'

import useSWR from 'swr';
import { useEffect, useState } from 'react';
 


const OrdersWrapper=({ Mode,filterCity })=>{
  const { data: session ,status ,update} = useSession()
  const [Orders  , setOrders] = useState([])
  const [ isFetch, setIsFetch] = useState(false)


  const WrapperStyle = {
    display:"flex" ,
    flexDirection: Mode === "Cards" ? "row" : "column" ,
    flexWrap:"wrap",
    marginBottom:"100px",
    marginTop:"1em",
    justifyContent:"center",

  }

  useEffect(()=>{

   const getOrder = async  (city) => {
       if(!filterCity){  return [ ]  }
       
       try{
        setIsFetch(true)
          const res = await fetch(`/api/board/orders/?city=${city}`)
          const data = await res.json()
          setOrders(data)
          

      }
      catch(error){
          console.log(error);     
      }
      finally{
        setIsFetch(false)
      }

   }
   getOrder(filterCity)
  },[filterCity])
 
 if (status === 'loading' ) {
   return <h1 style={{textAlign:'center'}}>Loading...</h1>
 }   


  else if(isFetch){   return <h1 style={{textAlign:'center'}}>Loading Orders ...</h1>}
     
   return <div style={WrapperStyle}  
       >  
       {Orders .length !== 0 ? 
       
         Orders.map((data,i)=>{
            return  Mode === "Cards" ?  
             <HCard OrderData={data} key={i} /> 
             :
             <VCard OrderData={data} key={i} />
             
          })
           
        :
        <div>אין המנות</div>
   
     }
     </div>
}

export default OrdersWrapper

