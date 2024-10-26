import { useSession } from 'next-auth/react'
import HCard from '../../pages-components/board/items-display/h-card'
import VCard from '../../pages-components/board/items-display/v-card'
import { useContext, useEffect, useState } from 'react';
import {FilterCityConteax } from '../../context'
 


const OrdersWrapper=({ Mode})=>{
  const [ CityOrders ,setCityOrders] = useState(null)
  const [ filterCity, setFilterCity ] = useContext(FilterCityConteax)
  const [ isFetch, setIsFetch] = useState(false)

  const getOrders= async  (city) => {
    if(!city){  setCityOrders(null)  }
    
    try{
      setIsFetch(true)
      const res = await fetch(`/api/board/orders/?city=${city}`)
      const data = await res.json()   
        if (!data){  setCityOrders(null) }
        setCityOrders(data)

    }
    catch(e){;
     alert(e)
    }
    finally{
     setIsFetch(false)

    }
    
}

  const WrapperStyle = {
    display:"flex" ,
    flexDirection: Mode === "Cards" ? "row" : "column" ,
    flexWrap:"wrap",
    marginBottom:"100px",
    marginTop:"1em",
    justifyContent:"center",

  }
 // get orders when reactive value changes  filterCity
  useEffect(()=>{

        if(filterCity){
     getOrders(filterCity)
        }
    

  },[filterCity])
  
 if(isFetch){ 
    return <h1 style={{textAlign:'center'}}>Loading Orders ...</h1>
  }
     
 return <div style={WrapperStyle}  
       >  
       { Array.isArray(CityOrders) && filterCity  ? 
       
        CityOrders.map((order,i)=>{
            return  Mode === "Cards" ?  
             <HCard OrderData={order} key={i}  /> 
             :
             <VCard OrderData={order} key={i} />
             
          })
           
        :
        <div>אין המנות</div>
   
     }
     </div>
}

export default OrdersWrapper

