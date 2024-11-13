import Colors from '../../lib/colors'
import { Button, Container, Flex , Heading } from '@chakra-ui/react';

function QuickcSingIn() {


  return (
    <Container>
    <Flex
     direction={"column"} 
     justifyContent={"space-around"} 
     alignItems={"center"} 
      height={"13em"} 
      background={Colors.d}
      boxShadow={'0 2px 8px rgba(0, 0, 0, 1)'}
 
       >
        <Heading  textAlign={"center"} fontSize={"2em"} color={Colors.b} >צריך עזרה פרסם עכשיו ?!  </Heading>
        <Button borderColor={Colors.b} variant={"outline"}  > הזמנה חדשה </Button>
    </Flex>
    </Container>
    )
}

export default QuickcSingIn;