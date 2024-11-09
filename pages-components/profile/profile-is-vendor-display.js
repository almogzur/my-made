import React from 'react';
import { MdEdit } from 'react-icons/md';
import { FaRegClipboard } from 'react-icons/fa';
import Colors from '../../lib/colors';
import Link from 'next/link';
import { Container , Heading , Text , Flex, Button} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

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
           <Text textAlign={"center"} fontSize={"large"}  color={Colors.c} mb={"20px"} p={2} > ניתן לראות הזמנות בלוח עבודות  </Text>

            <Flex p={4} direction={"column"} gap={"15px"} mb={"20px"} >
        <Flex justifyContent={"space-between"} borderBottom={"2px solid #c2b5a9"} pb={"8px"} fontWeight={"bold"}  >

          <Text  >שם</Text>
          <Text >{user.name}</Text>
        </Flex>

        <Flex  justifyContent={"space-between"} borderBottom={"2px solid #c2b5a9"} pb={"8px"} fontWeight={"bold"}  >

          <Text >טלפון</Text>
          <Text   >{user.phone ?? "לא זמין"}</Text>

        </Flex>


        <Flex justifyContent={"space-between"} borderBottom={"2px solid #c2b5a9"} pb={"8px"} fontWeight={"bold"}  >
          <Text >זמין</Text>
          <Text >{user.isVendor ? 'כן' : 'לא'}</Text>
        </Flex>
        
            </Flex>

             <Flex p={4} direction={"column"} m={1} borderBottom={'4px dotted #c2b5a9'} width={"inherit"}  fontWeight={"bold"}   >
         <Text >תיאור</Text>
        <Text >{user.description}</Text>
             </Flex>
       

            <Flex p={4} justifyContent={"center"}  gap={"10px"}  m={4}  >


           <Button fontSize={"medium"}  borderRadius={"4px"} width={"120px"} variant={"subtle"} background={Colors.d} onClick={()=>setEdit(true) }>
                <MdEdit  color={Colors.b} />  
            <Text>ערוך פרטים</Text> 

           </Button>
        {user?.isVendor && 
          <Link href={"/bord"} >

          <Button    width={"120px"} fontSize={"medium"} background={Colors.d} variant={"subtle"}>
              <FaRegClipboard color={Colors.b}/> <Text> לוח עבודות</Text> 
          </Button>
          </Link>
        }

            </Flex>
            </Container>
        </Container>
    </motion.div>
  );
};



export default VendorDisplay;
