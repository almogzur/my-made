import Link from 'next/link';
import Colors from '../../../lib/colors';
import { Badge, Box, Card, Text, Flex } from "@chakra-ui/react";
import { Button } from "../../../components/ui/button";
import { motion, AnimatePresence, easeIn } from 'framer-motion';

const MotionCard = motion(Card.Root);

const Vcard = ({ order, itemIndex, expandedIndex, handleExpand }) => {

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
          x: { duration: (itemIndex + 3) / 3 },
          opacity: { duration: 0.2 },
          height: { duration: (itemIndex + 1) / 3, type: 'spring' },
        }}
        viewport={{ once: false, amount: 0.4 }} 

    
      >
        <Card.Body>
          <Card.Title color={Colors.c}  fontSize="2xl" mt="-0.5" fontWeight="bold">
            {order?.name || 'לא זמין'}
          </Card.Title>
          <Text fontSize="md">כתובת: {order?.address || 'לא זמין'}</Text>
          <Text>עיר : {order?.city || 'לא זמין'}</Text>
          <Text>תאריך הזמנה: {new Date(order?.ResurveDate).toLocaleString('he-IL').slice(0,10) || "לא זמין "}</Text>
          <Text>טלפון: {order?.orderPhone || 'לא זמין'}</Text>
          <Text>מחיר: {order?.orderPrice || '0'}</Text>
          
      

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
                    <Badge color={order?.orderStatus === "Open" ? "green" : "red"}>
                    {order?.orderStatus || 'לא ידוע'}
                    </Badge>
                  </strong>
                
                  <strong>חדרים: {order?.ApartmentRoomsNumber || 'לא זמין'}</strong>
                  <strong>גודל: {order?.ApartmentSize ? `${order.ApartmentSize} מ"ר` : 'לא זמין'}</strong>
                  <strong>חדרי רחצה: {order?.NumberOfBaths || 'לא זמין'}</strong>
                  <strong>תיאור עבודה: {order?.JobDescription || 'לא זמין'}</strong>
                  <strong>שעה: {order?.FromH || 'לא זמין'} - {order?.ToH || 'לא זמין'}</strong>
                  <strong>מזהה הזמנה : {order?.orderId.slice(0,10) +"..." || 'לא זמין'}</strong>
                  
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
              onClick={() => {
                handleExpand(itemIndex)
             
                }
                
              }
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