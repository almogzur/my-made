import { useSession } from 'next-auth/react'
import Card from '../../pages-components/bord/card'
import { useContext, useEffect, useState } from 'react';
import {FilterCityContext } from '../../context'
import LoadingSpinner from '../../components/my-spinner/loading-spinner';
import { Container, Flex } from "@chakra-ui/react"
import { GiVacuumCleaner } from "react-icons/gi";
import Colors from '../../lib/colors';


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
    return <Flex
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                bg={"#fff"}
                height={"12em"}
                width={'100%'}
                >

             <LoadingSpinner/>
            </Flex> 
  }
     
 return (
        
          <Flex width={"100%"} p={0} m={0}flexWrap={"wrap"} justifyContent={"space-around"}  bg={"#fff"} >  
            
              { Array.isArray(CityOrders) && filterCity  ?     
              
                 CityOrders.map((order,i)=>{
                   return(
                     <Card 
                        order={order} itemIndex={i} 
                        key={i} 
                        expandedIndex={expandedIndex}
                        handleExpand={handleExpand}
                     />
                     )})
                   :
                   <Flex
                       direction={"column"}
                       justifyContent={"center"}
                       alignContent={"center"}
                       background='#fff'
                       height={"12em"} 
                    >
                     <GiVacuumCleaner size={"5em"} color={Colors.c}  /> 
                  </Flex>
      
                    } 
                   


       </Flex>
   

 )
}


export default OrdersWrapper

