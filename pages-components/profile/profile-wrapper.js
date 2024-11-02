import React from 'react';
import ProfileCard from './profile-card'
import VendorInfo from './vendor-info';
import ProjectStatus from './project-status';
import Colors from '../../lib/colors';
import UserOrders from './user-orders'
const UserProfile = () => {
  const Style = {
    wrapper: {
      
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      padding: '20px',
      backgroundColor: '#F0F2F5',      
      background:Colors.d,

    },
    child: {
      flex: '1 1 100%',
      
    },
  };

  return (
    <div style={Style.wrapper}>
      <div style={Style.child}><ProfileCard /></div>
      <div style={Style.child}><UserOrders /></div>
      <div style={Style.child}><ProjectStatus /></div>
      <div style={Style.child}><VendorInfo /></div>
    </div>
  );
};
export default UserProfile