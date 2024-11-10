import Colors from "../../lib/colors";
import { Badge, Box, Card, Text, Flex, Container } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { WindowWidthContext } from '../../context';
import { useContext, useEffect } from 'react';
import { useSession } from "next-auth/react";
import useOrders from "../../lib/hooks/useOrders";
import BadgeStatus from "../../components/badge_status";

const MotionCard = motion(Card.Root);

const OrderCard = ({ order, itemIndex, expandedIndex, handleExpand }) => {

  const {xl,lg,md,sm} = useContext(WindowWidthContext)
  const { data: session, status, update } = useSession();
  const {  mutateOrders } = useOrders()

  const orderHendler = async (e,orderId,city,vendorEmail) => {
    console.log(e);
    
      e.preventDefault()
    try { 
           const options =  {
             method: 'POST',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify( { orderId , city , vendorEmail })
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

  return (
        <Container p={0} m={0} maxWidth={"360px"}>
         <AnimatePresence>
             <MotionCard        
                boxShadow="lg"
                m={sm && md?  3 : 2}
                p={0}
                bg="white"
                initial={{ x: 300, opacity: 0, height: 0 }}
                animate={{ x: 0, opacity: 1, height: 'auto' }}
                transition={{
                  x: { duration: (itemIndex + 3) / 3 },
                  opacity: { duration: 0.2 },
                  height: { duration: (itemIndex + 1) / 3, type: 'spring' },
                  }}
                 exit={{opacity:0, x:-300}}
             >    
              <Card.Body p={1} m={0}>
          
                    <Card.Title color={Colors.c}  fontSize="2xl" fontWeight="bold">  {order?.name || 'לא זמין'}</Card.Title>
                    <Text fontSize="md">כתובת: {order?.address || 'לא זמין'}</Text>
                    <Text>עיר : {order?.city || 'לא זמין'}</Text>
                    <Text>תאריך הזמנה: {new Date(order?.date).toLocaleString('he-IL').slice(0,10) || "לא זמין "}</Text>
                    <Text>טלפון: {order?.phone || 'לא זמין'}</Text>
                    <Text color={Colors.c} fontWeight={"bold"} fontSize={'larger'} > שעתון  : {order?.orderPrice || '0'}</Text>
          
      

                  <AnimatePresence>
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
                          <Flex direction="column" alignItems="center">
                          <BadgeStatus status={order.status}  />
                         <Text fontWeight={'bold'}  >חדרים: {order?.rooms || 'לא זמין'}</Text>
                         <Text fontWeight={'bold'}  >חדרי רחצה: {order?.baths || 'לא זמין'}</Text>
                         <Text fontWeight={'bold'}  >תיאור עבודה: {order?.jobDescription || 'לא זמין'}</Text>
                         <Text fontWeight={'bold'}  >שעה: {order?.hour || 'לא זמין'} - {order?.ToH || 'לא זמין'}</Text>
                         <Text fontWeight={'bold'} >מזהה הזמנה : {order?._id.slice(0,10) +"..." || 'לא זמין'}</Text>

                        <Box p={4}>

                          <Button 
                            backgroundColor={Colors.c} 
                            color="#fff" 
                            variant="outline" 
                            width={150}
                            onClick={(e)=>orderHendler(e, order._id, order.city , session?.user.email)}
                          >
                            <Text>קח הזמנה</Text>  
                          </Button>

                        </Box>
                          </Flex>
                       </motion.div>
            )}
                  </AnimatePresence>

                  <Flex direction="column" p={2}  alignItems="center">

            <Button
              colorPalette="gray"
              variant="surface"
              onClick={() => handleExpand(itemIndex)}
              width={120}
              color={Colors.c}
              
            >
              {isExpanded ? ' סגור' : ' פרטים'}
            </Button>

                  </Flex>
                  
               </Card.Body>
           </MotionCard>
         </AnimatePresence>
        </Container>
  );
};

export default OrderCard;
