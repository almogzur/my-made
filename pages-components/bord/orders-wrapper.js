import { useSession } from 'next-auth/react'
import HCard from '../../pages-components/bord/items-display/h-card'
import VCard from '../../pages-components/bord/items-display/v-card'
import { useContext, useEffect, useState } from 'react';
import {FilterCityContext } from '../../context'
import LoadingSpinner from '../../components/my-spinner/loading-spinner';
 


const OrdersWrapper=({ Mode})=>{
  const [ CityOrders ,setCityOrders] = useState(null)
  const [ filterCity, setFilterCity ] = useContext(FilterCityContext)
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

  const Style = {
    Wrap:{
      height:"400px",
      background:"#fff",
      width:"100%"
    },
    oldWrap:{
    display:"flex" ,
    flexDirection: Mode === "Cards" ? "row" : "column" ,
    flexWrap:"wrap",
    marginBottom:"100px",
    marginTop:"1em",
    justifyContent:"center",
    }
  }
 // get orders when reactive value changes  filterCity
  useEffect(()=>{

        if(filterCity){
     getOrders(filterCity)
        }
    

  },[filterCity])
  
 if(isFetch){ 
    return <LoadingSpinner/>
  }
     
 return <div style={Style.Wrap}  
       >  
       { Array.isArray(CityOrders) && filterCity  ? 
       
        CityOrders.map((order,i)=>{
            return  Mode === "Cards" ?  
             <HCard OrderData={order} key={i}  /> 
             :
             <VCard OrderData={order} key={i} />
             
          })
            :"אין הזמנות "
 
   
     }
     </div>
}

export default OrdersWrapper

