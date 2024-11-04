import Colors from '../../lib/colors'
import OrdersButton from '../../components/go-to-orders-button';
import { color } from 'framer-motion';
import { Flex , Heading } from '@chakra-ui/react';

function QuickcSingIn() {


  return (
    <Flex direction={"column"} justifyContent={"space-around"} alignItems={"center"}  height={"13em"} background={Colors.c} color={"#fff"} >
        <Heading  textAlign={"center"} fontSize={"2em"} color={"#fff"} >צריך עזרה פרסם עכשיו ?!  </Heading>
        <OrdersButton borderColor={"#fff"} />
    </Flex>
    )
}

export default QuickcSingIn;