import { useSession } from "next-auth/react";
import useUser from "../../lib/hooks/useUser";
import { Flex, Container , Heading ,Stack ,Icon , Text } from "@chakra-ui/react";


import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../../components/ui/accordion"

const VendorActiveOrders = () => {

  const { data: session ,status ,update} = useSession()
  const { user, isLoading, isValidating,  userError, mutate } = useUser(session?.user?.email);

  const VendorOrders = user?.Vendor?.Orders
  


  



const click = ()=>{
      console.log( VendorOrders)
}
  
    return (

      <Flex direction={"column"} p={4} bg={"#fff"}  mb={'100px'} alignItems={"center"} >

          <Heading p={4} >הזמנות משק</Heading>
      
 
          <Container>

            <AccordionRoot  size={"lg"} spaceY={4} textAlign={"end"} collapsible defaultValue={["info"]}>

               <Heading  size="lg">   פרטי הזמנות  </Heading>

                { Array.isArray(VendorOrders) && 

                         VendorOrders.map((order,i) =>  // for every oreder 

                              <AccordionItem   key={i} value={order.orderId} >
                                  
                               
                                 <AccordionItemTrigger   >
                                 <Flex direction={"row-reverse"} gap={20}>

                                 <Text>{order.name} </Text>
                                 <Text> {order.orderPhone}</Text>
                                 <Text>{order.price}</Text>
                                 
                                 </Flex>
                                 </AccordionItemTrigger>


                                  <AccordionItemContent p={0}>{"גם פה הכתב הוא בעברית "}{}</AccordionItemContent>
                                  <AccordionItemContent> {"גם פה הכתב הוא בעברית "}</AccordionItemContent>


                            </AccordionItem>
                )}


            </AccordionRoot>
            
          </Container>

      </Flex>
    );
  };
  
 
  
  export default VendorActiveOrders;
  
  const items = [
    {
      value: "info",
      title: "Product Info",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum.",
    },
    {
      value: "stats",
      title: "Stats",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum.",
    },
  ]
  