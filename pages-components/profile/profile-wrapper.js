import {  Badge, Button, Container, Flex, Heading, Text ,Box , Stack } from '@chakra-ui/react';
import { List } from "@chakra-ui/react"

import BadgeStatus from '../../components/badge_status';
import { motion , AnimatePresence, color } from 'framer-motion';
import { BiSolidMessageAdd } from "react-icons/bi";
import { WindowWidthContext } from '../../context';
import LoadingSpinner from '../../components/my-spinner/loading-spinner';
import NewOrder from './profile-new-order';
import Colors from '../../lib/colors';
import useUser from '../../lib/hooks/useUser';
import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import { DialogActionTrigger,DialogBody,DialogCloseTrigger,DialogContent,DialogFooter,DialogHeader,DialogRoot,DialogTitle,DialogTrigger } from "../../components/ui/dialog"

import Popover from '../../components/popover'


  const badge_h = "40px" 
  const badge_w = "60px"
  const na = "מידע לא זמין"


const ProfileOrders = () => {

  const { data: session, status, update } = useSession();
  const { user, isLoading, isValidating,  userError, updateUser } = useUser(session?.user?.email);
  const [isRemoving, setIsRemoving] = useState(false);
  const { xxl,xl,lg,md,sm,xs,xxs} = useContext(WindowWidthContext);  
  const combinedOrders = (user?.Profile_Orders || []).concat(user?.Profile_Active_Orders || []);
  const animate = {
                initial:{opacity:0},
                 animate:{opacity:1},
                transition:{duration:2 }
} 

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

  return  <motion.div { ...animate} style={{fontWeight:"bold" , paddingBottom:"100px" }} >
      
            <Container p={3}  >
                <OrderInfoText/>
                <NewOrderDialg btnsStyle={ { variant:"solid",  bg:Colors.b , size:xs?"lg":"sm" , color:"black", fontWeight:"bold" } } />
                <OrderExmp/>
                  {combinedOrders.map((order, index) => 
                     <DataRow order={order} index={index}  key={order._id + index + "DataRow"} />
                  )}
       
     
            </Container>

         </motion.div>
  
};

const OrderInfoText = ()=>{
  return <Container p={2} >
           <Container p={5} mb={2}>
             <Heading   p={2}   fontSize={"3xl"}>  ההזמנות שלי </Heading> 
             <Stack>
             <Heading  size="md" m={2}>פעולות </Heading>
             <Text fontWeight={400}  p={0.5}> ניתן ליראות לפתוח הזמנות חדשות </Text> 
             <Text fontWeight={400}  p={0.5} > להיות במעקב וליצות קשר עם נותן השירות   </Text>
             </Stack>
           </Container>

            <Heading>סטטוס הזמנה </Heading>
           <Flex p={4} >
            <List.Root  mb={4} gap="2" variant="plain"  align="start"  >

             <List.Item>
              <List.Indicator asChild >
              <Badge colorPalette={"green"} w={badge_w} h={badge_h}  textAlign={"center"}>חדשה</Badge> 
              </List.Indicator>
              <Text > הזמנהה  חדשה ו מופיע בלוח </Text>  
             </List.Item>

            <List.Item>
             <List.Indicator asChild >
             <Badge h={badge_h} w={badge_w} colorPalette={"orange"} textAlign={"center"}>טיפול</Badge>
             </List.Indicator>
             <Text>  ההזמנה  נלקחה ע״י נותן שירות ועודנה בפרטיו</Text>
            </List.Item>

          <List.Item>
            <List.Indicator asChild >
              <Badge colorPalette={"red"} h={badge_h} w={badge_w} textAlign={"center"} >סגורה </Badge>
              </List.Indicator>
              <Text>ההזמנה נסגרה על ידי נותן השירות </Text>
            </List.Item>

        </List.Root>
           </Flex>
 </Container>
}

const OrderExmp=()=>{
  return (

    
      <Container   p={0} mb={3} boxShadow={'0 4px 8px rgba(0, 0, 0, 1)'} maxWidth={"1000px"} >
      <Flex  
           bg={"gray.300"} 
           justifyContent={"space-around"}  
           alignItems={"center"}  
           height={"60px"}
              >               
      <Text p={3} colorPalette={""} >סטטוס</Text>
      <Text p={3}>לתאריך </Text>
      <Text p={3} colorPalette={""}   disabled >פרטים </Text>
      <Text p={3} colorPalette={""}   disabled >עדכון </Text>

    </Flex>
      </Container>

  )
}

const DataRow = ({order , index})=>{
  const [infoPop ,setInfoPopup] = useState()
  const [editPop ,setEditPopup] = useState()


  const { xxl,xl,lg,md,sm,xs,xxs} = useContext(WindowWidthContext);

    const vendorInfo = [
    { title: "שם נותן השירות" , value:order.Vendor_Name , flag:true },
    { title: "טלפון לייצירת קשר" , value:order.Vendor_Phone, flag:true},
   ]

    const orderDetails = [
  { title: "מזמין", value: order.name  },
  { title : "שעת הגעה מבוקשת", value:order.hour},
  { title: "תאריך ", value: order.date ? new Date(order.date).toLocaleString('he-IL').slice(0,10)  : na },
  { title: "כתובת", value: order.address || na },
  { title: "עודכנה ב", value: order.updateAt ? new Date(order.updateAt).toLocaleString('he-IL') : "ללא עדכונים " },
  { title: "עיר" , value: order.city || na},
  { title: "שעתון ", value: order.price || na},
  { title: "בקשות", value: order.jobDescription || na },

   ]
    const combinedDetails = order.status === "inProcess" ? orderDetails.concat(vendorInfo) : orderDetails;

    const longTail = new Date(order.date).toLocaleString('he-IL')
    const midTail = longTail.slice(0,10)
    const shortTail = longTail.slice(0,5)

    return (  
      <Flex justifyContent={"center"} >
               
       <Flex   
             boxShadow={'0 2px 6px rgba(0, 0, 0, 1)'} 
              justifyContent={"space-around"}  
              alignItems={"center"}  
              bg={"#fff"} 
              height={"60px"} 
              basis={"100%"}
              m={1}
              
              >

             <BadgeStatus key={order.status + order._id} textStyle={xxs && xs ? "sm" :null } status={order.status}/>
             <Text  fontSize={!xs? 13 : 15} key={order.data} >{!xs? shortTail :midTail  || ""}</Text>
     
             <Popover 
                  key={order._id + index + 'popup1'} 
                  open={infoPop} 
                  setOpen={setInfoPopup} 
                  openTrigerText={"פרטים"}  
                  position={{placement: "top-start"}} 
                  btnsStyle={{variant:"outline",fontWeight:"bold"}}
                   > 
                {combinedDetails.map(( {title , value ,flag} , index ) => (
                
                     <Flex  key={order._id+ index +"list"}   p={0.5} style={{direction:"rtl"}} >
                   { flag? 
                       <Flex justifyContent={"space-between"} pt={0.2} basis={"100%"} key={ order._id + index + "badges" } >    
                         <Badge  fontWeight={"bold"} p={1}  key={ order._id + title } colorPalette={"red"}>{title}</Badge>
                         <Badge  fontWeight={"bold"} p={1}  key={ value? value : order._id + index + "missing render Value" } colorPalette={"red"} >{value}</Badge>
                      </Flex>
                      :
                      <Flex justifyContent={"space-between"} key={ order._id + index + value }  flexBasis={"100%"} >
                          <Text fontWeight={"bold"} key={title}>{title}</Text>
                          <Text  fontWeight={"bold"} key={order._id + value? value : index + "mising render value" + title } >{value}</Text>
                     </Flex>
                }                        
                  </Flex>
                ))}
                
            </Popover>

            <Popover 
               key={order._id + index + 'popup2'} 
               open={editPop} 
               setOpen={setEditPopup} 
               openTrigerText={"עדכון"} 
               position={{placement:"top"}}   
               btnsStyle={{variant:"outline" , fontWeight:"bold"}} 
               >
              <NewOrder setPerent={setEditPopup} id={order._id} submitBtnStyle={{bg:Colors.a,color:"black",fontWeight:'bold'}}  />
           </Popover>
      </Flex>
     {/* <Button colorPalette={"red"} onClick={(e) => handleRemoveOrder(e,order._id)}>
        {isRemoving ? 'מוחק...' : 'מחק'}
      </Button>  */}


     </Flex>

    )

}

const NewOrderDialg =({btnsStyle})=>{
        const [open ,setOpen] = useState(false)
        const { xxl,xl,lg,md,sm,xs,xxs} = useContext(WindowWidthContext);

    return  <Flex p={4} justifyContent={"center"}  >

       <DialogRoot open={open}   >

         <DialogTrigger asChild >
           <Button onClick={()=>setOpen(true)}  {...btnsStyle}   >  {<BiSolidMessageAdd/>}{"הזמנה חדשה"} </Button>
         </DialogTrigger>
          <DialogContent maxWidth={"430px"} >


        <DialogHeader >
        </DialogHeader>

        <DialogBody  style={{direction:"rtl"}}   >

        <NewOrder setPerent={setOpen}  newOrder={true} submitBtnStyle={{...btnsStyle}} />

        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
          <Button {...btnsStyle} onClick={()=>setOpen(false)} >סגור</Button>
        </DialogActionTrigger>

        </DialogFooter>

        <DialogCloseTrigger />


         </DialogContent>

      </DialogRoot>
            </Flex>
}




export default ProfileOrders