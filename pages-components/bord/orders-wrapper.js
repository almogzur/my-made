import { useSession } from 'next-auth/react'
import VCard from '../../pages-components/bord/items-display/v-card'
import { useContext, useEffect, useState } from 'react';
import {FilterCityContext } from '../../context'
import LoadingSpinner from '../../components/my-spinner/loading-spinner';
import { Container } from "@chakra-ui/react"

const OrdersWrapper=({ Mode})=>{
  const [ CityOrders ,setCityOrders] = useState(null)
  const [ filterCity, setFilterCity ] = useContext(FilterCityContext)
  const [ isFetch, setIsFetch] = useState(false)

  const getOrders= async  (city) => {
    if(!city || city === "אזור" ){  setCityOrders(null)  }
    
    try{
      setIsFetch(true)
      const res = await fetch(`/api/bord/orders/?city=${city}`)
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
       padding:"20px",
         background:"#fff",
          width:"100%",
          display:'flex',
          flexDirection:'column',
          
          alignItems:'center',
          alignContent:'center',
      },
    oldWrap:{
    }
  }
 // get orders when reactive value changes  filterCity
  useEffect(()=>{
    console.log(filterCity)
        if(filterCity){
     getOrders(filterCity)
        }
    

  },[filterCity])

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  
 if(isFetch){ 
    return <LoadingSpinner/>
  }
     
 return (
        <Container style={Style.Wrap}>  

         { Array.isArray(CityOrders) && filterCity  ? 
       
             CityOrders.map((order,i)=>{
             return ( <VCard 
               order={order} itemIndex={i} 
               key={i} 
               expandedIndex={expandedIndex}
               handleExpand={handleExpand}
           />)
          })
            :"אין הזמנות " } 
        


      </Container>
 )
}


export default OrdersWrapper

