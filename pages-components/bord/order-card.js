import Colors from "../../lib/colors";
import { Badge, Box, Card, Text, Flex, Container , Heading , Separator } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { WindowWidthContext } from '../../context';
import { useContext, useEffect } from 'react';
import { useSession } from "next-auth/react";
import useOrders from "../../lib/hooks/useOrders";
import { DataListItem, DataListRoot } from "../../components/ui/data-list"


const OrderCard = ({ order, itemIndex, expandedIndex, handleExpand }) => {

  const { xxl,xl,lg,md,sm,xs,xxs } = useContext(WindowWidthContext);
  const { data: session, status, update } = useSession();
  const {  mutateOrders } = useOrders()

  const orderHendler = async (e,order,vendorEmail) => {
    console.log(e);
    
      e.preventDefault()
    try { 
           const options =  {
             method: 'POST',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify( {  vendorEmail , order  })
             }


      const res = await fetch(`/api/bord/update-owner`,options);

      
      if (res.ok) {
        update();
        setTimeout(() => {
        mutateOrders() 
       }, 3000); 
      }


    } 
    catch (error) {
      alert(error)
      
    }

     // console.log(orderId,userEmail,city);
      
  }

  const isExpanded = expandedIndex === itemIndex 

  const midTail = new Date(order.date).toLocaleString('he-IL').slice(0,10)
  const shortTail = midTail.slice(0,5)

  const Fields = [
    { label:"טלפון " , value:order.phone},
    { label: "כתובת", value: order.address },
    { label: "חדרים", value: order.rooms },
    { label: "תאריך", value: midTail },
    { label : "לשעה", value:order.hour},
    { label: "אזור / עיר", value: order.city },
    { label: "בקשות", value: order.jobDescription },
    // update this to fisplay only if  update the order 
    { label: "עודכן בתאריך",  value:  order.updatedByUserAt ? new Date(order.updatedByUserAt).toLocaleString('he-IL') :  ""},
    { label:"שעתון" , value: order.price + " שח",  }
   ];

  return (
        
        
         <AnimatePresence mode="popLayout" >
               <Container  maxW={'1000px'}      
                 m={0}  
                 mb={1}
                 boxShadow={"xl"}
                 p={2}     
                 initial={{  opacity: 0, height: 0 }}
                 animate={{  opacity: 1, height: 'auto',
                            transition:{ opacity: { duration: 1 },
                                         height: { duration: (itemIndex ) , type: 'spring' },
                                        }
                         }}
                 exit={{opacity:0, x:-300, transition:{} }}
             >    

                  <Flex justifyContent={"space-between"} alignItems={"center"}   >
                    <Flex direction={"column"} >

                     <Text p={1} fontSize={"md"}     fontWeight={"bold"}  > שעתון :  {order?.price}</Text>
                     <Separator/>
                     <Text p={1}    fontSize={"md"} fontWeight={"bold"} > תאריף {midTail}</Text>
                     <Separator/>
                     <Text p={1}  fontSize={"md"}     fontWeight={"bold"}  > כתובת: { order.address }</Text>
                     <Separator/>

                  </Flex>
                      <Button
                        onClick={() => handleExpand(itemIndex)}
                        p={0}
                        h={"50px"}  //  fix size to prevent layout shift when text swap 
                        width={"60px"} // same
                      >
                        {isExpanded ? ' סגור' : ' פרטים'}
                      </Button>
                  </Flex>
      

                  <AnimatePresence mode="sync">
                   {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                             height:{ duration: 1.5 , ease:"backOut" },
                             opacity:{ duration: 0.5 },
                          }}    
                         >
                            <Flex direction="column"  fontWeight={"bold"} justifyContent={"space-between"}  >
                            <DataList Fields={Fields}  headingText={"פרטי הזמנה "} />

                          <Button 
                            backgroundColor={Colors.c} 
                            color="#fff" 
                            variant="outline" 
                            width={150}
                            onClick={(e)=>orderHendler(e,order,  session?.user.email )}
                          >
                            <Text>קח הזמנה</Text>  
                          </Button>

                          </Flex>
                       </motion.div>
            )}
                  </AnimatePresence>

                  
               </Container>
         </AnimatePresence>
 
  
  );
};

export default OrderCard;

const DataList = ({Fields , size, headingText})=>{
  return (
      <DataListRoot p={4} size={size?? "sm"}  orientation="horizontal" style={{direction:"rtl"}}   >
        <Heading textAlign={"center"} color={Colors.d} fontSize={"2xl"} >{headingText??""}</Heading>

        { Fields.map((item) => (
           item.value  && // only if value
       <DataListItem  key={item.label} label={item.label} value={item.value} p={0} m={0}  fontSize={"sm"}  />
  ))}
      </DataListRoot>
  
  )
}
