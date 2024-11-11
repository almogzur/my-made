import { useSession } from 'next-auth/react';
import { useContext, useState, Fragment } from 'react';
import useUser from '../../lib/hooks/useUser';
import Colors from '../../lib/colors';
import NewOrder from './profile-new-order';
import LoadingSpinner from '../../components/my-spinner/loading-spinner';
import { WindowWidthContext } from '../../context';
import { BiSolidMessageAdd } from "react-icons/bi";

import { motion , AnimatePresence } from 'framer-motion';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"

import { List } from "@chakra-ui/react"


import ControldPopOvre from '../../components/controled-popover';


import {  Badge, Button, Container, Flex, Heading, Text ,Box } from '@chakra-ui/react';
import BadgeStatus from '../../components/badge_status';
import { title } from 'process';


 const badge_h = "40px" 
  const badge_w = "60px"


const ProfileOrders = () => {

  const na = "מידע לא זמין"

  const { data: session, status, update } = useSession();
  const { user, isLoading, isValidating,  userError, updateUser } = useUser(session?.user?.email);
  const [isRemoving, setIsRemoving] = useState(false);
  const { xxl,xl,lg,md,sm,xs,xxs} = useContext(WindowWidthContext);
  
  const combinedOrders = (user?.Profile_Orders || []).concat(user?.Profile_Active_Orders || []);

 

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

  if (status === 'loading' || isLoading || isRemoving ) {
    return <LoadingSpinner />;
  }

  

  return <motion.div
           initial={{opacity:0}}
           animate={{opacity:1}}
           transition={{duration:2 }}
  >
          <Container background={'gray.200'} p={2}     >
               
                <OrderInfoText/>
                <OrderExmp/>
                
              {/* DATA */}
              {/* Orders Container  */}
               <Container maxWidth={"1000px"} p={0}  >
                  {combinedOrders.map((order, index) => {
                  //  console.log(order)

                    const vendorInfo = [
                          { title: "שם נותן השירות" , value:order.Vendor_Name , flag:true },
                          { title: "טלפון לייצירת קשר" , value:order.Vendor_Phone, flag:true},
                        ]

                    const orderDetails = [
                        { title: "מזמין", value: order.name  },
                        { title: "מחיר לשעה", value: order.price || na},
                        { title : "משעה", value:order.hour},
                        { title : "עד שעה", value:order.tooHour},
                        { title: "תאריך ", value: order.date ? new Date(order.date).toLocaleString('he-IL').slice(0,10)  :na },
                        { title: "כתובת", value: order.address || na },
                        { title: "תיאור", value: order.jobDescription || na },
                        { title: "עודכנה ב", value: order.updateAt ? new Date(order.updateAt).toLocaleString('he-IL') : na },
                        { title: "עיר" , value: order.city || na},
                      
                    ]

                    const combinedDetails = order.status==="inProcess" ? orderDetails.concat(vendorInfo) : orderDetails;
                         
                          {/* Order row */} 
                   return (
                          <Flex 
                              key={order._id + index + "MainFlex"} 
                              m={1}  
                              borderRadius={7} 
                              justifyContent={"space-around"}  
                              alignItems={"center"}  
                              bg={"#fff"} 
                               height={"60px"}
                              >     
                             
                             <BadgeStatus key={order.status + order._id} textStyle={xxs && xs ? "sm" :null } status={order.status}/>
                             <Text key={order.data} >{order.date.slice(0,10)}</Text>

                            {/* Open For Info  */}
                             <ControldPopOvre key={order._id + index +" pop_over_wrap "}  id={order._id} index={index} >
                                 {/* ControldPopOvre children */}

                                {combinedDetails.map(( {title , value ,flag} , index ) => (
                                    <Flex  
                                     key={order._id+ index +"list"} 
                                     justifyContent={"space-between"}
                                     p={0.5} 
                                     style={{direction:"rtl"}}
                                     >
                                   { flag?
                                         <Flex  key={ order._id + index + "badges" }>    
                                           <Badge   key={ order._id + title } colorPalette={"orange"}>{title}</Badge>
                                           <Badge  key={ value? value : order._id + index + "missing render Value" } colorPalette={"orange"} >{value}</Badge>
                                         </Flex>
                                          :
                                          <Flex justifyContent={"space-between"} key={ order._id + index + value }  flexBasis={"100%"} >
                                              <Text fontWeight={"bold"} key={title}>{title}</Text>
                                              <Text  fontWeight={"bold"} key={order._id + value? value : index + "mising render value" + title } >{value}</Text>
                                         </Flex>
                                   } 
                                  
                                 
                                   </Flex>
                                    ))}

                                 {/* ControldPopOvre children  */}


                            </ControldPopOvre>
                            {/* Open For Info  */}

                                     
                          
                            {/* <Button colorPalette={"red"} onClick={(e) => handleRemoveOrder(e,order._id)}>
                                  {isRemoving ? 'מוחק...' : 'מחק'}
                                </Button>  */}
                         </Flex>
                          )
                         {/* Order row */} 
                          })}
               </Container>
                {/* Orders Container End */}
                {/* DATA End */}

                <NewOrderDialg/>

           </Container>
          </motion.div>
  
};

export default ProfileOrders;

const OrderInfoText = ()=>{
  return <>
     <Heading textAlign={"center"} p={2}  color={Colors.d} fontSize={"3xl"}>ההזמנות  שלי </Heading> 
     <Heading fontWeight={400} textAlign={"center"} p={2}>במסך זה ניתן ליראות את ההזמנות שלכם</Heading> 
  
     <Flex justifyContent={"center"}>
        <List.Root  mb={4} gap="2" variant="plain"  align="start"  >

     <List.Item>
      <List.Indicator asChild >
      <Badge colorPalette={"green"} w={badge_w} h={badge_h}  textAlign={"center"}>חדשה</Badge> 
      </List.Indicator>
      <Text > הזמנהה בסטטוס חדשה ו מופיע בלוח </Text>  
     </List.Item>

    <List.Item>
     <List.Indicator asChild >
     <Badge h={badge_h} w={badge_w} colorPalette={"orange"} textAlign={"center"}>טיפול</Badge>
     </List.Indicator>
     <Text>  ההזמנה בסטטוס נלקחה ע״י נותן שירות ועודנה בפרטיו</Text>
    </List.Item>

  <List.Item>
    <List.Indicator asChild >
      <Badge colorPalette={"red"} h={badge_h} w={badge_w} textAlign={"center"} >סגורה </Badge>
      </List.Indicator>
      <Text>ההזמנה נסגרה על ידי נותן השירות </Text>
    </List.Item>

        </List.Root>
      </Flex>
 </>
}

const OrderExmp=()=>{
  return <Flex justifyContent={"center"} >
   <Container maxWidth={"1000px"}  p={0} m={0}>
    <Flex m={1}  borderRadius={7}  bg={"gray.400"} justifyContent={"space-around"}  alignItems={"center"}  height={"60px"}   >               
      <Text p={3} colorPalette={""} >סטטוס</Text>
      <Text p={3}>לתאריך </Text>
      <Text p={3} colorPalette={""}   disabled >פרטי ההזמנה </Text>
    </Flex>
 </Container>
  </Flex>
}

const NewOrderDialg =()=>{
        const [open ,setOpen] = useState()
  return  <Flex p={4} justifyContent={"center"}  >
     <DialogRoot open={open} >

         <DialogTrigger asChild >
           <Button variant="solid" bg={Colors.d} size="lg" color={"black"} fontWeight={"bold"}>  {<BiSolidMessageAdd/>}{"הזמנה חדשה"} </Button>
         </DialogTrigger>
          <DialogContent >


        <DialogHeader >
        </DialogHeader>

        <DialogBody  style={{direction:"rtl"}} >

        <NewOrder setPerent={setOpen}  newOrder={true} />

        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
        <Button  >סגור</Button>
        </DialogActionTrigger>

        </DialogFooter>

        <DialogCloseTrigger />


         </DialogContent>

      </DialogRoot>
     </Flex>
}
