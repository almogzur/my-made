import { useSession } from 'next-auth/react';
import { useContext, useState, Fragment } from 'react';
import useUser from '../../lib/hooks/useUser';
import Colors from '../../lib/colors';
import NewOrder from './profile-new-order';
import LoadingSpinner from '../../components/my-spinner/loading-spinner';
import { WindowWidthContext } from '../../context';
import { BiSolidMessageAdd } from "react-icons/bi";
import { motion , AnimatePresence } from 'framer-motion';
import { List } from "@chakra-ui/react"

import {  Badge, Button, Container, Flex, Heading, Text ,Box } from '@chakra-ui/react';
import BadgeStatus from '../../components/badge_status';
import { DialogActionTrigger,DialogBody,DialogCloseTrigger,DialogContent,DialogFooter,DialogHeader,DialogRoot,DialogTitle,DialogTrigger } from "../../components/ui/dialog"

import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "../../components/ui/popover"

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

  return  <motion.div { ...animate} style={{fontWeight:"bold" ,  }} >

           <Container p={2}  >
                <OrderInfoText/>
                  {combinedOrders.map((order, index) => <DataRow order={order} index={index}  key={order._id + index + "DataRow"} />)}
                <NewOrderDialg/>
           </Container>
          </motion.div>
  
};

const OrderInfoText = ()=>{
  return <>
      <Container p={5} mb={2}>
        <Heading  textAlign={"center"} p={2}  color={Colors.d} fontSize={"3xl"}>ההזמנות  שלי </Heading> 
        <Heading fontWeight={400} textAlign={"center"} p={2}>במסך זה ניתן ליראות לפתוח הזמנות חשדשות </Heading> 
        <Heading fontWeight={400} textAlign={"center"} p={2} > להיות במעקב וליצות קשר עם נותן השירות   </Heading>
     </Container>


           <Flex >
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
  return (
    <Flex>
      <Container   p={0} mb={3} boxShadow={'0 4px 8px rgba(0, 0, 0, 1)'} >
      <Flex  
           bg={"gray.400"} 
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
   </Flex>
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
  { title: "מחיר לשעה", value: order.price || na},
  { title : "משעה", value:order.hour},
  { title : "עד שעה", value:order.tooHour},
  { title: "תאריך ", value: order.date ? new Date(order.date).toLocaleString('he-IL').slice(0,10)  : na },
  { title: "כתובת", value: order.address || na },
  { title: "תיאור", value: order.jobDescription || na },
  { title: "עודכנה ב", value: order.updateAt ? new Date(order.updateAt).toLocaleString('he-IL') : na },
  { title: "עיר" , value: order.city || na},

   ]
    const combinedDetails = order.status === "inProcess" ? orderDetails.concat(vendorInfo) : orderDetails;

    return (    
       <Container  m={0} p={0} >   

           <OrderExmp/>

          <Flex  boxShadow={'0 2px 6px rgba(0, 0, 0, 1)'} borderRadius={3} justifyContent={"space-around"}  alignItems={"center"}  bg={"#fff"} height={"60px"}>     
   
           <BadgeStatus key={order.status + order._id} textStyle={xxs && xs ? "sm" :null } status={order.status}/>
            <Text  fontSize={!xs? 13 : 15} key={order.data} >{new Date(order.date).toLocaleString("he-IL").slice(0,10).slice(0,5)|| ""}</Text>
              {/* resurve closeing option dataPop  */}
            <Popover open={infoPop} setOpen={setInfoPopup} openTrigerText={"פרטים"}  key={order._id + index + 'popup1'} position={{placement: "top-start"}}> 
                {combinedDetails.map(( {title , value ,flag} , index ) => (
                
                <Flex      key={order._id+ index +"list"}  justifyContent={"space-between"} p={0.5} style={{direction:"rtl"}} >
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
            </Popover>

                {/*  close popup in responce.ok using need state controol */}
            <Popover open={editPop} setOpen={setEditPopup} openTrigerText={"עדכון"} key={order._id + index + 'popup2'}  position={{  offset: { crossAxis: 0, mainAxis: -50 }  }
            } >
              <NewOrder setPerent={setEditPopup} id={order._id} />
           </Popover>

  {/* <Button colorPalette={"red"} onClick={(e) => handleRemoveOrder(e,order._id)}>
        {isRemoving ? 'מוחק...' : 'מחק'}
      </Button>  */}
         </Flex>
      </Container>
    )

}

const NewOrderDialg =()=>{
        const [open ,setOpen] = useState(false)
        
  return  <Flex p={4} justifyContent={"center"}  >
       <DialogRoot open={open} >

         <DialogTrigger asChild >
           <Button variant="solid" onClick={()=>setOpen(true)} bg={Colors.d} size="lg" color={"black"} fontWeight={"bold"}>  {<BiSolidMessageAdd/>}{"הזמנה חדשה"} </Button>
         </DialogTrigger>
          <DialogContent >


        <DialogHeader >
        </DialogHeader>

        <DialogBody  style={{direction:"rtl"}} >

        <NewOrder setPerent={setOpen}  newOrder={true} />

        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
        <Button onClick={()=>setOpen(false)} >סגור</Button>
        </DialogActionTrigger>

        </DialogFooter>

        <DialogCloseTrigger />


         </DialogContent>

      </DialogRoot>
     </Flex>
}

const Popover = ({children, headline ,openTrigerText, position , open ,setOpen  })=>{
  const { xxl,xl,lg,md,sm,xs,xxs} = useContext(WindowWidthContext);
  return (
    <PopoverRoot  h={badge_h} w={badge_w}  open={open} onOpenChange={(e)  => setOpen(e.open)  } positioning={position? position : {}}>
       <PopoverTrigger asChild>
         <Button  fontWeight={"bold"}  variant={"outline"}    p={2} size="sm"   >{openTrigerText} </Button>
       </PopoverTrigger>

        <PopoverContent portalled={open}>
        <PopoverArrow />
         <PopoverBody > 
            <Heading textAlign={"center"}>{headline}</Heading>
             {children}
             <Button variant={"outline"} colorPalette={"gray"} onClick={()=>setOpen(false)} > סגור   </Button>
        </PopoverBody>
       </PopoverContent>


    </PopoverRoot>
  )

}





export default ProfileOrders;