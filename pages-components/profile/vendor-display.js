import React from 'react';
import { MdEdit } from 'react-icons/md';
import { FaRegClipboard } from 'react-icons/fa';
import Colors from '../../lib/colors';
import Link from 'next/link';
import { Container , Heading , Text , Flex, Button} from '@chakra-ui/react';

// link is 32 k Route is 113k for 1 navigation 
// replaced width Link

const ProfileDetails = ({ user, setEdit,  }) => {


  return (
    <Container p={"30px"} background={"#fff"}>
       <Heading fontSize={"2rem"} fontWeight={"bold"} textAlign={"center"} color={Colors.c} >  נרשמתם בהצלחה </Heading>
       <Text textAlign={"center"} fontSize={"medium"}  color={Colors.c} mb={"20px"} p={2} > ניתן לראות הזמנות בלוח עבודות  </Text>

      <Flex direction={"column"} gap={"15px"} mb={"20px"} >
      
      <Flex justifyContent={"space-between"} borderBottom={"2px solid #c2b5a9"} pb={"8px"} fontWeight={"bold"}  >

          <Text  >שם</Text>
          <Text >{user.BussniseName}</Text>
        </Flex>

        <Flex justifyContent={"space-between"} borderBottom={"2px solid #c2b5a9"} pb={"8px"} fontWeight={"bold"}  >

          <Text >טלפון</Text>
          <Text   >{user.phone ?? "לא זמין"}</Text>

        </Flex>

        <Flex justifyContent={"space-between"} borderBottom={"2px solid #c2b5a9"} pb={"8px"} fontWeight={"bold"}  >
          <Text >מחיר לשעה</Text>
          <Text >{user.price}</Text>
        </Flex>

        <Flex justifyContent={"space-between"} borderBottom={"2px solid #c2b5a9"} pb={"8px"} fontWeight={"bold"}  >
          <Text >זמין</Text>
          <Text >{user.isVendor ? 'כן' : 'לא'}</Text>
        </Flex>
        
      </Flex>

      <Flex direction={"column"} m={1} borderBottom={'4px dotted #c2b5a9'} width={"inherit"}  fontWeight={"bold"}   >
         <Text >תיאור</Text>
        <Text >{user.description}</Text>
      </Flex>

       <Flex justifyContent={"space-evenly"} gap={"10px"}  p={2} background={""} >


           <Button fontSize={"medium"}  borderRadius={"4px"} width={"120px"}  background={Colors.d} onClick={() => setEdit(true)}>
                <MdEdit  color={Colors.c} />  
                <Text>ערוך פרטים</Text> 

           </Button>
        {user?.isVendor && 
          <Link href={"/bord"} >
          <Button    width={"120px"} fontSize={"medium"} background={Colors.d}>
             
                <FaRegClipboard  color={Colors.c} />
                 <Text> לוח עבודות</Text>
           
          </Button>
          </Link>
        }

      </Flex>
      
    </Container>
  );
};



export default ProfileDetails;
