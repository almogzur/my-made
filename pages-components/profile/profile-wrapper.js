import React from 'react';
import VendorWrap from './profile-vendor-wrap';
import ProfileOrders from './profile-orders'
import { Container, Flex } from '@chakra-ui/react';
import ProfileAvatr from './profile-avatar';
import VendorActiveOrders from './vendor-active-orders'

const UserProfilePage = () => {

  return (
    <Flex  wrap={"wrap"} gap={"30px"} p={0}>
    
      <Container > 
           <ProfileAvatr /> 
      </Container>

      <Container >
          <ProfileOrders />
      </Container>

      <Container >
          <VendorWrap />
      </Container>

      <Container >
        <VendorActiveOrders />
      </Container>

    </Flex>
  );
};
export default UserProfilePage