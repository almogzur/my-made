import React from 'react';
import ProfileCard from '../../pages-components/new-profile/profile-card'
import ContactInfo from '../../pages-components/new-profile/content-info';
import SocialLinks from '../../pages-components/new-profile/social-link';
import ProjectStatus from '../../pages-components/new-profile/project-status';

const UserProfile = () => {
  return (
    <>
    <div style={styles.container}>

      <ProfileCard />
      <ContactInfo />
      <SocialLinks />
      <ProjectStatus />
    </div>
    </>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#F0F2F5',
  },
};

export default UserProfile;
