import Colors from '../../lib/colors'
import OrdersButton from '../../components/go-to-orders-button';
import { color } from 'framer-motion';
import { Flex , Heading } from '@chakra-ui/react';

function QuickcSingIn() {


  return (
    <Flex
     direction={"column"} 
     justifyContent={"space-around"} 
     alignItems={"center"} 
      height={"13em"} 
      background={Colors.d}
      boxShadow={'0 2px 8px rgba(0, 0, 0, 1)'}
 
       >
        <Heading  textAlign={"center"} fontSize={"2em"} color={Colors.b} >צריך עזרה פרסם עכשיו ?!  </Heading>
        <OrdersButton borderColor={Colors.b} />
    </Flex>
    )
}

export default QuickcSingIn;