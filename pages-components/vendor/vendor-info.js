import React from 'react';
import { MdEdit } from 'react-icons/md';
import { FaRegClipboard } from 'react-icons/fa';
import Colors from '../../lib/colors';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { BsFillInfoSquareFill } from "react-icons/bs";
import { BiSolidMessageAdd } from "react-icons/bi";
import useUser from '../../lib/hooks/useUser';
import { useSession } from 'next-auth/react'
import { Flex, Container , Heading ,Stack ,Icon , Text, Badge , Button } from "@chakra-ui/react";

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
// link is 32 k Route is 113k for 1 navigation 
// replaced width Link

const VendorInfo = ({  setEdit ,edit }) => {
  const { data: session ,status ,update} = useSession()

  const { user , isLoading , isError , updateUser} = useUser(session?.user?.email)

  return (
      <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:2 }}
     
      >   <Container>
            <Flex justifyContent="center" direction={"column"} >
               <OnBording />

               {/*  this is going to look loke order list just deff info  */}

              <VendorActiveOrders />  
            </Flex>
          </Container>
    </motion.div>
  );
};



export default VendorInfo;


const OnBording = ()=>{
  const { data: session ,status ,update} = useSession()

  const { user , isLoading , isError , updateUser} = useUser(session?.user?.email)


  return   <Flex justifyContent={"center"} >
             <Flex direction={"column"} alignItems={"center"}  >
                <Container>

                 <Heading fontSize={"2rem"} fontWeight={"bold"}  color={Colors.c} >  נרשמתם בהצלחה </Heading>
                 <Text  fontSize={"large"}  color={Colors.c}  p={2} > ניתן לראות הזמנות בלוח   </Text>
             
                </Container>

              <Flex justifyContent={"space-evenly"} >

                <Link href={"/bord"}  >
                <Button  fontWeight={"bold"}  width={"120px"} fontSize={"medium"} background={Colors.d} variant={"subtle"}>
                  <FaRegClipboard color={Colors.b}/> <Text> לוח  </Text> 
                </Button>
                </Link>

                 <DialogRoot
                placement={"center"}
                motionPreset="slide-in-bottom"
                >
                 <DialogTrigger asChild>
                  <Button fontWeight={"bold"} fontSize={"medium"}  borderRadius={"4px"} width={"120px"} variant={"subtle"} background={Colors.d} >{"פרטים"}{<BsFillInfoSquareFill color='#fff'/>}  </Button>
                 </DialogTrigger>
                 <DialogContent>

                <DialogHeader>
                <DialogTitle></DialogTitle>
                </DialogHeader>

                <DialogBody>
                <Flex p={4} direction={"column"} gap={"15px"} mb={"20px"} >

                <Flex justifyContent={"space-between"} borderBottom={`2px solid ${Colors.d} `} pb={1} fontWeight={"bold"}  >
                 <Text >{user.name}</Text>
                 <Text  >שם</Text>
                </Flex>

                <Flex  justifyContent={"space-between"} borderBottom={`2px solid ${Colors.d} `}  pb={1} fontWeight={"bold"}  >

                 <Text   >{user.phone ?? "לא זמין"}</Text>
                <Text >טלפון</Text>

                </Flex>


                <Flex justifyContent={"space-between"} borderBottom={`2px solid ${Colors.d} `}  pb={1} fontWeight={"bold"}  >
                 <Text >{user.isVendor ? 'כן' : 'לא'}</Text>
                <Text >זמין</Text>
                </Flex>

                </Flex>

                <Flex p={1} direction={"column"} textAlign={"end"} m={1} borderBottom={`4px dotted ${Colors.d}  `} width={"inherit"}  fontWeight={"bold"}   >
                 <Text >תיאור</Text>
                 <Text >{user.description}</Text>


                </Flex>

                </DialogBody>

                <DialogFooter>
                <DialogActionTrigger asChild>
                <Button variant="outline">סגור</Button>
                </DialogActionTrigger>
                <Button 
                fontSize={"medium"}  
                borderRadius={"4px"} 
                width={"120px"} 
                variant={"outline"} 
                onClick={()=>setEdit(true)}
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


            </Flex>
            </Flex>  
}


const VendorActiveOrders = () => {

  const { data: session ,status ,update} = useSession()
  const { user, isLoading, isValidating,  userError, updateUser } = useUser(session?.user?.email);

  const VendorOrders = user?.Vendor?.Vendor_Orders
  
  const isVendor = user?.Vendor?.isVendor
  const na = "לא זמין "
  
    return isVendor &&
       <motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:1}}
        style={{  margin:"10px"  }}
     >
      <Flex  alignItems={"center"} >
          <Container maxWidth={"700px"}>
            <Heading textAlign={"center"} p={4} fontSize={"3xl"} color={Colors.c} >הזמנות  לקוחות</Heading>
    
            <AccordionRoot collapsible defaultValue={["b"]}>   

             { Array.isArray(VendorOrders) &&
                VendorOrders?.map((order, index) => {
                  const Fields = [
                     { label: "חדרים", value: order.rooms },
                     { label: "תאריך", value: order.date.slice(0,10)},
                     {label : "משעה", value:order.hour},
                     {label : "עד שעה", value:order.tooHour},
                     { label: "עיר", value: order.city },
                     { label: "כתובת", value: order.address },
                     { label: "אמבטיות", value: order.baths },
                     { label: "תיאור העבודה", value: order.jobDescription },
                     { label: "גודל", value: order.size },
                     { label: "נוצר בתאריך", value: new Date(order.createdAt).toLocaleString('he-IL') },
                     // update this to fisplay only if  update the order 
                     { label: "עודכן בתאריך",  value:  order.updateAt ? new Date(order.updateAt).toLocaleString('he-IL') :   na}
                    ];

            return  <AccordionItem key={index} value={index} bg={"#fff"} p={2} m={1} mt={2} borderRadius={15} >

                        <AccordionItemTrigger >
                           <Flex bg={"#fff"} gap={"5px"}  direction={"row-reverse"}   >
                              {<Heading fontSize={"medium"}  >שם : {order.name}  </Heading>}
                              {<Heading fontSize={"medium"} >טלפון :  {  order.phone}</Heading>}
                              {<Badge colorPalette={"green"} size={"lg"} > {  order.price + ` שח `}   </Badge>}
                        </Flex>
                        </AccordionItemTrigger>
                      
                      
                         <AccordionItemContent>
                         { 
                            <Flex direction={"column"} p={1}  >
                               { Fields.map((item)=>{
                                          // only dispaly the item if it not Nullish
                                  return item.value &&  
                                              <Flex  borderBottom={`dotted 0.8px `}  >
                                                 <Heading fontSize={"medium"} width={"50%"} textAlign={"start"} >{item.value} </Heading>
                                                 <Heading fontSize={"medium"}  width={"50%"} textAlign={"end"}  key={item.value}   > {item.label}  </Heading>
                                              </Flex>
                                            
                                     })
                                 } 
                            </Flex>
                           }
                         </AccordionItemContent>


                       </AccordionItem>
              } )}
            </AccordionRoot>

          </Container>
      </Flex>
      </motion.div>
  };