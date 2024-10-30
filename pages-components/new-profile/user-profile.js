import React from 'react';
import ProfileCard from '../../pages-components/new-profile/profile-card'
import ContactInfo from '../../pages-components/new-profile/content-info';
import SocialLinks from '../../pages-components/new-profile/social-link';
import ProjectStatus from '../../pages-components/new-profile/project-status';
import Colors from '../../lib/colors';

const UserProfile = () => {
  const styles = {
    wrapper: {
      
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      padding: '20px',
      backgroundColor: '#F0F2F5',      
      background:Colors.d

    },
    child: {
      flex: '1 1 100%',
      
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.child}><ProfileCard /></div>
      <div style={styles.child}><ContactInfo /></div>
      <div style={styles.child}><SocialLinks /></div>
      <div style={styles.child}><ProjectStatus /></div>
    </div>
  );
};
export default UserProfile