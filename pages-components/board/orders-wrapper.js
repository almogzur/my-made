import { useSession } from 'next-auth/react'
import HCard from '../../pages-components/board/items-display/h-card'
import VCard from '../../pages-components/board/items-display/v-card'
import { useEffect, useState } from 'react';
 


const OrdersWrapper=({ Mode,filterCity })=>{
  const { data: session ,status ,update} = useSession()
  const [ Orders  , setOrders] = useState([])
  const [ isFetch, setIsFetch] = useState(false)


  const WrapperStyle = {
    display:"flex" ,
    flexDirection: Mode === "Cards" ? "row" : "column" ,
    flexWrap:"wrap",
    marginBottom:"100px",
    marginTop:"1em",
    justifyContent:"center",

  }
 // get orders when reactiv value changes 
  useEffect(()=>{

   const getOrders= async  (city) => {
       if(!filterCity){  setOrders(null)  }
      
       setIsFetch(true)
       try{
         const res = await fetch(`/api/board/orders/?city=${city}`)
         const data = await res.json()   
           if (!data){  setOrders(null) }
         setOrders(data)
         setIsFetch(false)

       }
       catch(e){;
        alert(e)
       }
       
   }
   getOrders(filterCity)
 

  },[filterCity])
 
 if (status === 'loading' ) {
   return <h1 style={{textAlign:'center'}}>Loading...</h1>
 }   
 else if(isFetch){   return <h1 style={{textAlign:'center'}}>Loading Orders ...</h1>}
     
 return <div style={WrapperStyle}  
       >  
       { Array.isArray(Orders) ? 
       
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

