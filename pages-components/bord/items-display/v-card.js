import Link from 'next/link';
import Colors from '../../../lib/colors';
import { Badge, Box, Card, Text, Flex } from "@chakra-ui/react";
import { Button } from "../../../components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useState } from 'react';
import { OrderContext, FilterCityContext } from "../../../context";

const MotionCard = motion(Card.Root); // Create a motion component for the Card
const Vcard = ({ orderData , index }) => {

  const [orderContext, setOrderContext] = useContext(OrderContext);
  const [filterCity, setFilterCity] = useContext(FilterCityContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);



  return (
    <AnimatePresence>
      <MotionCard
        flexDirection="column"
        overflow="hidden"
        width="100%"
        maxWidth={"700px"} // Set width to 100%
        p="0"
        m={2}
        boxShadow="lg"
        borderRadius="md"
        bg="white"
        initial={{ x: 300, opacity: 0  , height:0}} 
        animate={{ x: 0, opacity: 1 , height:'auto' }} 
        
        transition={{ 
          x: {duration: index +1} ,
          opacity:{ duration:2 } , 
          height:{duration:index + 1 , type:"spring"}
          }} 
      >

          <Card.Body >

            <Card.Title color={Colors.c} mb="2" fontSize="2xl" mt="-0.5" fontWeight="bold">{orderData?.name || 'לא זמין'}</Card.Title>

      
                <Text style={{display:'flex',flexDirection:'column',justifyContent:'center'}} fontSize="md" width="100%">   </Text>
                <Text>כתובת:{orderData?.addres || 'לא זמין'}, </Text> 
                <Text>עיר : {orderData?.city || 'לא זמין'}</Text>
                <Text>תאריך הזמנה: {new Date(orderData.ResurveDate).toLocaleString('he-IL').slice(0,10)} </Text> 
                <Text>טלפון: {orderData?.orderPhone || 'לא זמין'}</Text> 
                <Text>מחיר: {orderData?.orderPrice || '0'}</Text> 
              
           
      

            <AnimatePresence>

          {isExpanded && (
              <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden', padding: '8px', backgroundColor: Colors.lightGray, borderRadius: '8px' }}
            >
              <Box mt="4" textAlign="center">
   
                  <strong>מזהה הזמנה :  {orderData?.orderId || 'לא זמין'}</strong> 
                  <br />
                  <strong>סטטוס:</strong> 
                  <Badge color={orderData?.orderStatus === "Open" ? "green" : "red"}>{orderData?.orderStatus || 'לא ידוע'}</Badge>
                  <br />
                  <strong>חדרים: {orderData?.ApartmentRoomsNumber || 'לא זמין'}</strong> 
                  <br />
                  <strong>גודל: {orderData?.ApartmentSize ? `${orderData.ApartmentSize} מ"ר` : 'לא זמין'}</strong> 
                  <br />
                  <strong>חדרי רחצה: {orderData?.NumberOfBaths || 'לא זמין'}</strong> 
                  <br />
                  <strong>תיאור עבודה:  {orderData?.JobDescription || 'לא זמין'}</strong> 
                  <br />
                  <strong>שעה:  {orderData?.FromH || 'לא זמין'} - {orderData?.ToH || 'לא זמין'}</strong>
               
              </Box>
             </motion.div>
          )}
             </AnimatePresence>

             <Box mt="4">
               <Button colorPalette="gray" variant="outline" onClick={toggleExpand} width={200} >
              {isExpanded ? 'להראות פחות' : 'להראות יותר'}
             </Button>
           </Box>
          </Card.Body>
       

      </MotionCard>
    </AnimatePresence>
  );
};

export default Vcard;
