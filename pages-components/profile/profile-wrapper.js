import React from 'react';
import ProfileCard from './profile-card'
import VendorWrap from './vendor-wrap';
import ProjectStatus from './project-status';
import UserOrders from './user-orders'
import { Container, Flex } from '@chakra-ui/react';

const UserProfilePage = () => {

  return (
    <Flex  wrap={"wrap"} gap={"30px"} p={0}>
    
      <Container > 
           <ProfileCard /> 
      </Container>

      <Container >
          <UserOrders />
      </Container>

      <Container >
        <ProjectStatus />
      </Container>

      <Container >
          <VendorWrap />
      </Container>
    </Flex>
  );
};
export default UserProfilePage