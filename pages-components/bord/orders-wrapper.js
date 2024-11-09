import { useSession } from 'next-auth/react'
import Order from './order-card'
import { useContext, useEffect, useState } from 'react';
import {FilterCityContext } from '../../context'
import LoadingSpinner from '../../components/my-spinner/loading-spinner';
import { Container, Flex } from "@chakra-ui/react"
import { GiVacuumCleaner } from "react-icons/gi";
import Colors from '../../lib/colors';
import useOrders from '../../lib/hooks/useOrders';


const OrdersWrapper=({ Mode })=>{
  const [ filterCity, setFilterCity ] = useContext(FilterCityContext)
  const [ isFetch, setIsFetch] = useState(false)
  const  [ orderIsRemoved , setOrderIsRemoved] = useState(null)
  const { orders, orderError , isOrderLoading , isOrderValidating , mutateOrders } = useOrders(filterCity)



  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  
 if(isFetch){ 
    return <Flex
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                bg={"gray.200"}
                height={"12em"}
                width={'100%'}
                >

             <LoadingSpinner/>
            </Flex> 
  }
     
 return (
        
          <Flex 
            width={"100%"} 
            p={0} 
            m={0} 
            flexWrap={"wrap"} 
            justifyContent={"space-around"} 
            background={'gray.200'}
            minHeight={"600px"}
             >  
            
              { Array.isArray(orders) && filterCity  ?     
              
                orders.map((order,i)=>{
                   return(
                     <Order 
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
                       background='gray.200'
                       height={"12em"} 
                    >
                     <GiVacuumCleaner size={"5em"} color={Colors.c}  /> 
                  </Flex>
      
                    } 
                   


         </Flex>
   

 )
}


export default OrdersWrapper

