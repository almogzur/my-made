import { useSession } from 'next-auth/react';
import { useContext, useState, Fragment } from 'react';
import useUser from '../../lib/hooks/useUser';
import Colors from '../../lib/colors';
import UiDialog from '../../components/dialog/ui-dialog';
import NewOrder from './profile-new-order';
import LoadingSpinner from '../../components/my-spinner/loading-spinner';
import { WindowWidthContext } from '../../context';
import { IoMdAddCircle } from "react-icons/io";
import { motion , AnimatePresence } from 'framer-motion';
import { DataListItem, DataListRoot as DataList } from "../../components/ui/data-list"
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "../../components/ui/popover"

import ControldPopOvre from '../../components/controled-popover';


import {  Badge, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import BadgeStatus from '../../components/badge_status';

const ProfileOrders = () => {

  const na = "מידע לא זמין"

  const { data: session, status, update } = useSession();
  const { user, isLoading, isValidating,  userError, updateUser } = useUser(session?.user?.email);
  const [isRemoving, setIsRemoving] = useState(false);
  const { xxl,xl,lg,md,sm,xs,xxs} = useContext(WindowWidthContext);
  

  const handleRemoveOrder = async (e,_id) => {
    e.preventDefault()
    setIsRemoving(true);
  try {
    const res = await fetch(`/api/profile/remove-order?id=${_id}`, { method: 'DELETE' });
    const data = await res.json();

    if (res.ok) {
      update();
      updateUser()
    }
  } catch (error) {
    console.error('Failed to remove order:', error);
  } finally {
    setIsRemoving(false);
  }
};

  const popuphendler = (e) =>{
      
    setOpenPopOver(e? e : false)

}



  if (status === 'loading' || isLoading || isRemoving ) {
    return <LoadingSpinner />;
  }


  return <motion.div
           initial={{opacity:0}}
           animate={{opacity:1}}
           transition={{duration:2 }}
  >
          <Container background={'gray.200'} p={2}     >
              <Heading textAlign={"center"} p={4} m={1} color={Colors.d} fontSize={"3xl"}>ההזמנות  שלי </Heading> 

              <Container maxWidth={"1000px"} p={0} >

                 <Flex  justifyContent={"space-between"} alignItems={"center"}  background={Colors.d} p={2} >
                   <Badge p={3} colorPalette={""} >סטטוס</Badge>
                   <Badge p={3}>לתאריך</Badge>
                   <Badge p={3} colorPalette={""}   disabled >פרטים</Badge>
                 </Flex>
                 
                  {user?.Profile_Orders?.map((order, index) => {
                    const orderDetails = [
                    { title: "מזמין", value: order.name },
                    { title: "מחיר לשעה", value: order.price || na},
                    { title : "משעה", value:order.hour},
                    { title : "עד שעה", value:order.tooHour},
                    { title: "תאריך ", value: order.date ? new Date(order.date).toLocaleString('he-IL').slice(0,10)  :na },
                    { title: "כתובת", value: order.address || na },
                    { title: "תיאור", value: order.jobDescription || na },
                    
                    { title: "עודכנה ב", value: order.updateAt ? new Date(order.updateAt).toLocaleString('he-IL') : na },
                         ];
            
                   return <Flex  key={order.orderId} justifyContent={"space-around"}  alignItems={"center"}  bg={"#fff"} height={"60px"}  >

                             <BadgeStatus textStyle={xxs && xs ? "sm" :null } status={order.status}/>
                             <Text >{order.date.slice(0,10)}</Text>
                             <ControldPopOvre id={order._id} >
                                {orderDetails.map((item) => (
                                  <Flex direction={""} justifyContent={"space-between"} p={0.5} >
                                    <Text key={item.value} >{item.value}</Text>
                                    <Text key={item.title}>{item.title}</Text>
                                  </Flex>
                                    ))}
                            </ControldPopOvre>
                          
                            {/* <Button colorPalette={"red"} onClick={(e) => handleRemoveOrder(e,order._id)}>
                                  {isRemoving ? 'מוחק...' : 'מחק'}
                                </Button>  */}
                         </Flex>
                          })}

                <Flex p={4} justifyContent={"center"}>
                  <UiDialog
                     buttonText="הזמנה חדשה"
                        buttonStyle={{background:Colors.d}}
                     Icon={<IoMdAddCircle size="2em" color={Colors.b} />}
                  >
                   <NewOrder newOrder={true} />
             
                  </UiDialog>
                </Flex>
              </Container>

        </Container>
     </motion.div>
  
};

export default ProfileOrders;
