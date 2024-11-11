import React from 'react';
import { MdEdit } from 'react-icons/md';
import { FaRegClipboard } from 'react-icons/fa';
import Colors from '../../lib/colors';
import Link from 'next/link';
import { Container , Heading , Text , Flex, Button} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { BsFillInfoSquareFill } from "react-icons/bs";
import { BiSolidMessageAdd } from "react-icons/bi";


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

const VendorDisplay = ({ user, setEdit ,edit }) => {


  return (
      <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:2 }}
      >
        <Container p={4} background={'gray.200'}>
          <Container maxWidth={"700px"}>
           <Heading fontSize={"2rem"} fontWeight={"bold"} textAlign={"center"} color={Colors.c} >  נרשמתם בהצלחה </Heading>
           <Text textAlign={"center"} fontSize={"large"}  color={Colors.c} mb={"20px"} p={2} > ניתן לראות הזמנות בלוח   </Text>



       

      
       
            {/* Btn Wrap  */}
            <Flex p={4} justifyContent={"center"}  gap={"10px"}  m={4}  >     
              {user?.isVendor && 
              <>
                <Link href={"/bord"} >
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
               </>
               }

            </Flex>
            </Container>
        </Container>
    </motion.div>
  );
};



export default VendorDisplay;
