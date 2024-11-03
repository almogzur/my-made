import Link from 'next/link';
import Colors from '../../../lib/colors';
import { Badge, Box, Card, Text, Flex } from "@chakra-ui/react";
import { Button } from "../../../components/ui/button";
import { motion, AnimatePresence, easeIn } from 'framer-motion';

const MotionCard = motion(Card.Root);

const Vcard = ({ orderData, itemIndex, expandedIndex, handleExpand }) => {

  const isExpanded = expandedIndex === itemIndex 

  return (
    <AnimatePresence>
      <MotionCard
        flexDirection="column"
        overflow="hidden"
        width="100%"
        maxWidth="700px"
        p="0"
        m={2}
        boxShadow="lg"
        borderRadius="md"
        bg="white"
        initial={{ x: 300, opacity: 0, height: 0 }}
        animate={{ x: 0, opacity: 1, height: 'auto' }}
        transition={{
          x: { duration: (itemIndex + 1) / 2 },
          opacity: { duration: 2 },
          height: { duration: (itemIndex + 1) / 3, type: 'spring' },
        }}
      >
        <Card.Body>
          <Card.Title color={Colors.c}  fontSize="2xl" mt="-0.5" fontWeight="bold">
            {orderData?.name || 'לא זמין'}
          </Card.Title>
          <Text fontSize="md">כתובת: {orderData?.address || 'לא זמין'}</Text>
          <Text>עיר : {orderData?.city || 'לא זמין'}</Text>
          <Text>תאריך הזמנה: {new Date(orderData.ReserveDate).toLocaleDateString('he-IL')}</Text>
          <Text>טלפון: {orderData?.orderPhone || 'לא זמין'}</Text>
          <Text>מחיר: {orderData?.orderPrice || '0'}</Text>
          
      

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={ {
                  height:{ duration: 1.5 , ease:"backOut" },
                  opacity:{ duration: 1 }
                } }
         
              >


                <Flex direction="column" alignItems="center">
                  <strong>סטטוס:  
                    <Badge color={orderData?.orderStatus === "Open" ? "green" : "red"}>
                    {orderData?.orderStatus || 'לא ידוע'}
                    </Badge>
                  </strong>
                
                  <strong>חדרים: {orderData?.ApartmentRoomsNumber || 'לא זמין'}</strong>
                  <strong>גודל: {orderData?.ApartmentSize ? `${orderData.ApartmentSize} מ"ר` : 'לא זמין'}</strong>
                  <strong>חדרי רחצה: {orderData?.NumberOfBaths || 'לא זמין'}</strong>
                  <strong>תיאור עבודה: {orderData?.JobDescription || 'לא זמין'}</strong>
                  <strong>שעה: {orderData?.FromH || 'לא זמין'} - {orderData?.ToH || 'לא זמין'}</strong>
                  <strong>מזהה הזמנה : {orderData?.orderId.slice(0,10) +"..." || 'לא זמין'}</strong>
                  
                  <Box p={4}>
                    <Button backgroundColor={Colors.c} color="#fff" variant="outline" width={150}>
                      קח הזמנה
                    </Button>
                  </Box>
                </Flex>

              </motion.div>
            )}
          </AnimatePresence>

          <Flex direction="column" alignItems="center">
            <Button
              colorPalette="gray"
              variant="subtle"
              backgroundColor="gray"
              onClick={() => handleExpand(itemIndex)}
              width={200}
            >
              {isExpanded ? ' סגור' : ' פרטים'}
            </Button>
          </Flex>


        </Card.Body>
      </MotionCard>
    </AnimatePresence>
  );
};

export default Vcard;
