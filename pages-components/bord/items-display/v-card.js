import Link from 'next/link';
import Colors from '../../../lib/colors';
import { Badge, Box, Card, Text } from "@chakra-ui/react";
import { Button } from "../../../components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useState } from 'react';
import { OrderContext, FilterCityContext } from "../../../context";

const MotionCard = motion(Card.Root); // Create a motion component for the Card

const Vcard = ({ orderData }) => {
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
        p="2"
        m={2}
        boxShadow="lg"
        borderRadius="md"
        bg="white"
        initial={{ x: 200, opacity: 0 }} // Initial state
        animate={{ x: 0, opacity: 1 }} // Animate to this state
        exit={{  opacity: 0 }} // Animate out with X and opacity
        transition={{ duration: 0.3 }} // Duration of the transition
      >
        <Box mb="1"  pb="0">
          <Card.Body >

            <Card.Title color={Colors.c} mb="2" fontSize="2xl" mt="-0.5" fontWeight="bold">{orderData?.name || 'לא זמין'}</Card.Title>

            <Card.Description mb={0}   >

              <Text style={{display:'flex',flexDirection:'column',justifyContent:'center'}} fontSize="md" width="100%">

                <strong>כתובת:{orderData?.addres || 'לא זמין'}, </strong> 
                <strong>עיר : {orderData?.city || 'לא זמין'}</strong>
                <strong>תאריך הזמנה: {new Date(orderData.ResurveDate).toLocaleString('he-IL').slice(0,10)} </strong> 
                <strong>טלפון: {orderData?.orderPhone || 'לא זמין'}</strong> 
                <strong>מחיר: {orderData?.orderPrice || '0'}</strong> 

              </Text>
            </Card.Description>
          </Card.Body>
        </Box>

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
                <Text fontSize="lg" textAlign="center" width="100%">
                  <strong>מזהה הזמנה:</strong> {orderData?.orderId || 'לא זמין'}
                  <br />
                  <strong>סטטוס:</strong> 
                  <Badge colorScheme={orderData?.orderStatus === "Open" ? "green" : "red"}>{orderData?.orderStatus || 'לא ידוע'}</Badge>
                  <br />
                  <strong>חדרים:</strong> {orderData?.ApartmentRoomsNumber || 'לא זמין'}
                  <br />
                  <strong>גודל:</strong> {orderData?.ApartmentSize ? `${orderData.ApartmentSize} מ"ר` : 'לא זמין'}
                  <br />
                  <strong>חדרי רחצה:</strong> {orderData?.NumberOfBaths || 'לא זמין'}
                  <br />
                  <strong>תיאור עבודה:</strong> {orderData?.JobDescription || 'לא זמין'}
                  <br />
                  <strong>שעה:</strong> {orderData?.FromH || 'לא זמין'} - {orderData?.ToH || 'לא זמין'}
                </Text>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        <Box mt="4">
          <Button colorPalette="gray" variant="outline" onClick={toggleExpand} width={200} co>
            {isExpanded ? 'להראות פחות' : 'להראות יותר'}
          </Button>
        </Box>

      </MotionCard>
    </AnimatePresence>
  );
};

export default Vcard;
