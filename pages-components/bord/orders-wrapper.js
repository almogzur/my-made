import { useSession } from 'next-auth/react'
import Card from './order-card'
import { useContext, useEffect, useState } from 'react';
import {FilterCityContext } from '../../context'
import LoadingSpinner from '../../components/my-spinner/loading-spinner';
import { Badge,Container, Flex , Button ,Text} from "@chakra-ui/react"

import Colors from '../../lib/colors';
import useOrders from '../../lib/hooks/useOrders';
import { WindowWidthContext } from '../../context';

const OrdersWrapper=({ Mode })=>{
  const [ filterCity, setFilterCity ] = useContext(FilterCityContext)
  const [ isFetch, setIsFetch] = useState(false)
  const  [ orderIsRemoved , setOrderIsRemoved] = useState(null)
  const { orders, orderError , isOrderLoading , isOrderValidating , mutateOrders } = useOrders(filterCity)
  const { xxl,xl,lg,md,sm,xs,xxs } = useContext(WindowWidthContext);

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
        <>
          <ExmpRow/>


               { 
               Array.isArray(orders) && filterCity  &&    
                   orders.map( (order,i) =>
                 
                    <Card 
                        order={order} itemIndex={i} 
                        key={i} 
                        expandedIndex={expandedIndex}
                        handleExpand={handleExpand}
                     />
            
                     )
          
              }                   

           
        </>

 )
}


export default OrdersWrapper

const ExmpRow = ()=> {
  
  const { xxl,xl,lg,md,sm,xs,xxs } = useContext(WindowWidthContext);

return  <Flex justifyContent={"space-between"} alignItems={"center"} fontSize={xs?"lg":"sm"} bg={"gray.300"} p={2} boxShadow={"lg"}   >
                    
  <Badge fontSize={"md"} p={4} fontWeight={"bold"}  > מחיר </Badge>
  <Badge fontWeight={'bold'} fontSize={"md"}  p={4} >לתאריך</Badge>

  

    <Badge
      colorPalette="gray"
      fontWeight={'bold'}
      fontSize={"md"}
      p={4}
    >
     פרטים
    </Badge>

  

</Flex>


}

