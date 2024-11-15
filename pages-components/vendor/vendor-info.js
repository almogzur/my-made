import React, { useState ,useContext } from 'react';
import { MdEdit } from 'react-icons/md';
import { FaRegClipboard } from 'react-icons/fa';
import Colors from '../../lib/colors';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { BsFillInfoSquareFill } from "react-icons/bs";
import { BiSolidMessageAdd } from "react-icons/bi";
import useUser from '../../lib/hooks/useUser';
import { useSession } from 'next-auth/react'
import { Flex, Container , Heading ,Box  , Text, Badge , Button, VStack, Stack } from "@chakra-ui/react";
import { WindowWidthContext } from '../../context';
import { DataListItem, DataListRoot } from "../../components/ui/data-list"

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../../components/ui/accordion"

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
import Popover from '../../components/popover';
// link is 32 k Route is 113k for 1 navigation 
// replaced width Link

const VendorInfo = ({  setEdit ,edit }) => {
  const { data: session ,status ,update} = useSession()


  return (
      <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:2 }}   
      >  

      <Flex justifyContent={"center"} >
       <Container m={0} p={1}  >
            <Flex justifyContent="center" direction={"column"} >
               <OnBording />

                <Heading textAlign={"center"} p={4} fontSize={"3xl"} >הלקוחות שלי</Heading>

                <DemoCustomerOrder/>

                <ActiveOrders />  

                <InfoDialog/>

            </Flex>


        </Container>
        </Flex>
    </motion.div>
  );
};



export default VendorInfo;


const OnBording = ()=>{

  const { data: session ,status ,update} = useSession()

  const { user , isLoading , isError , updateUser} = useUser(session?.user?.email)


  return    <Flex p={4} >
             
             <Flex  alignItems={"center"}   >
                <Container>

                  <Stack>
                    <Heading fontSize={"2rem"} fontWeight={"bold"}   p={2} >   דף ניהול לקוחות </Heading>
                    <Heading as="h2" size="md" mb={2}>פעולות </Heading>
                   <VStack align="start" spacing={3}>
                     <Text>   צפייה בפרטי הזמנה תאריך שעה טלפון  ועוד. </Text> 
                     <Text>עדכונים בזמן אמת על ביצוע שינוי בפרטי הזמנה.</Text>
                     <Text> </Text>
                   </VStack>
                 </Stack>
                </Container>

             </Flex>

            </Flex>  
}


const ActiveOrders = () => {

  const { data: session ,status ,update} = useSession()
  const { user, isLoading, isValidating,  userError, updateUser } = useUser(session?.user?.email);

  const VendorOrders = user?.Vendor?.Vendor_Orders
  const isVendor = user?.Vendor?.isVendor
  
    return (
        <motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:1}}
        style={{  margin:"10px"  }}
         >
        <Flex  direction={"column"}>
          { Array.isArray(VendorOrders) &&
                VendorOrders?.map((order, index) => 

           <OrderRow  key={order._id + "vendor_order" + index } order={order} index={index}  /> 
          )}
         
        </Flex>
       </motion.div>
      )
  };

const InfoDialog = ()=>{
  const { data: session ,status ,update} = useSession()
  const { user , isLoading , isError , updateUser} = useUser(session?.user?.email)
  const { xxl,xl,lg,md,sm,xs,xxs} = useContext(WindowWidthContext);

  return (  
     
        <Flex justifyContent={"center"} >
        
            <DialogRoot
            
               placement={"center"}
               motionPreset="slide-in-bottom"
          >
           <DialogTrigger asChild>
            <Button fontWeight={"bold"} fontSize={"medium"}  borderRadius={"4px"} variant={"subtle"} background={Colors.d} >{<BsFillInfoSquareFill color='#fff'/>} {"הפרטים שלי במערכת "} </Button>
           </DialogTrigger>
           <DialogContent>

          <DialogHeader >
            <DialogTitle p={4} fontWeight={"bold"}  textAlign={"end"} fontSize={!xs?"1xl":"2xl"} >פרטים המופעים במערכת </DialogTitle>
          </DialogHeader>

          <DialogBody>
          <Flex p={0} direction={"column"} gap={"15px"} mb={"20px"} fontSize={!xs?"16px":"lg"} >

          <Flex justifyContent={"space-between"} borderBottom={`2px solid ${Colors.d} `} p={1} fontWeight={"bold"}  >
           <Text >{user.Vendor.name}</Text>
           <Text  >שם</Text>
          </Flex>

          <Flex  justifyContent={"space-between"} borderBottom={`2px solid ${Colors.d} `}  p={1} fontWeight={"bold"}  >

           <Text   >{user.Vendor.phone ?? "לא זמין"}</Text>
          <Text >טלפון</Text>

          </Flex>


          <Flex justifyContent={"space-between"} borderBottom={`2px solid ${Colors.d} `}  p={1} fontWeight={"bold"}  >
           <Text >{user.Vendor.isVendor ? 'כן' : 'לא'}</Text>
          <Text >זמין</Text>
          </Flex>

          </Flex>

   
          </DialogBody>

            <DialogFooter>
            <DialogActionTrigger asChild>
            <Button variant="subtle" colorPalette={"blue"}>סגור</Button>
            </DialogActionTrigger>

            <Button 
            fontSize={"medium"}  
            borderRadius={"4px"} 
            width={"120px"} 
            variant={"subtle"} 
            onClick={()=>setEdit(true)}
            colorPalette={"blue"}
            >
            <MdEdit  color={Colors.b} 
            />  
            <Text>ערוך פרטים</Text> 
            </Button>
            </DialogFooter>

            <DialogCloseTrigger />

              </DialogContent>
            </DialogRoot>
        
        </Flex>
      


        
  )
} 


const DemoCustomerOrder = ()=>{

  const { xxl,xl,lg,md,sm,xs,xxs} = useContext(WindowWidthContext);

    return (
      <Flex justifyContent="center">

          <Container    p={3} m={0}   boxShadow="lg" bg={Colors.d} maxWidth={"1000px"} >
        <Flex justifyContent="space-around" p={1} fontSize={xs? "16px" : "12px"}  >

            <Text fontWeight="bold" > שם </Text>
            <Text fontWeight="bold">טלפון</Text>
          
            <Text fontWeight="bold">תאריך</Text>
            <Text fontWeight="bold">פרטים</Text>
          
        </Flex>

      </Container>

    </Flex>
  );
    
}

const OrderRow = ({order, index})=>{

    const [open,setOpen] = useState()
    const { xxl,xl,lg,md,sm,xs,xxs} = useContext(WindowWidthContext);

    const longTail = new Date(order.date).toLocaleString('he-IL')
    const midTail = longTail.slice(0,10)
    const shortTail = longTail.slice(0,5)
    const na = "לא זמין "


    const Fields = [
      { label: "חדרים", value: order.rooms },
      {label:"טלפון " , value:order.phone},
      { label: "תאריך", value: order.date.slice(0,10)},
      { label : "לשעה", value:order.hour},
      { label: "עיר", value: order.city },
      { label: "כתובת", value: order.address },
      { label: "בקשות", value: order.jobDescription },
      // update this to fisplay only if  update the order 
      { label: "עודכן בתאריך",  value:  order.updatedByUserAt ? new Date(order.updatedByUserAt).toLocaleString('he-IL') :  ""}
     ];

  return  <Flex justifyContent={"center"} >
          <Container maxWidth={"1000px"}
          p={3}
          m={0}
          mt={1}
          mb={1}
          boxShadow={"md"}
          
          
         >
         <Flex justifyContent="space-around" alignItems={"center"}  fontSize={xs? "16px" : "12px"} fontWeight="bold"  >
       
            <Text >{order.name}</Text>
            <Text >{order.phone}</Text>
            <Text key={order.data}> {!xs? shortTail : midTail}</Text>
 
            <Popover   
              open={open}  
              setOpen={setOpen} 
              openTrigerText={"פרטים"} 
              btnsStyle={{variant:"subtle",  colorPalette:"blue", fontWeight:"bold",m:2 }} 
              position={{placement:"top-end"}}
              >
               <DataList Fields={Fields}  />
           </Popover>      

         </Flex>
         </Container>
          </Flex>
}

const DataList = ({Fields})=>{
      return (
        <>
        <Heading textAlign={"center"} fontSize={"2xl"} >פרטי הזמנה</Heading>
        <Flex p={4} justifyContent={"end"} fontWeight={"bold"} direction={"column"} >
     
                <DataListRoot orientation="horizontal" style={{direction:"rtl"}} size={"sm"}  >
      {Fields.map((item) => (
        item.value  && // only if value
        <DataListItem key={item.label} label={item.label} value={item.value} p={0} m={0}  fontSize={"sm"}  />
      ))}
    </DataListRoot>
        </Flex>
        </>
      )
}