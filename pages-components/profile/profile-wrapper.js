import React from 'react';
import ProfileCard from './profile-card'
import VendorInfo from './vendor-info';
import ProjectStatus from './project-status';
import Colors from '../../lib/colors';
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
          <VendorInfo />
      </Container>
    </Flex>
  );
};
export default UserProfilePage