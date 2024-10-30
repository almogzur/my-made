import Image from "next/image";
import { useSession } from "next-auth/react";
import profileDefualtIcon from '../../public/User.jpg'
const styles = {
  card: {
    backgroundColor: 'white',
    padding: '20px',
  
    textAlign: 'center',

  },
  avatar: {
    width: '80px',
    borderRadius: '50%',
    
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  title: {
    color: 'gray',
  },
  location: {
    color: 'gray',
    fontSize: '14px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  followButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  messageButton: {
    backgroundColor: 'white',
    color: '#007bff',
    padding: '5px 10px',
    borderRadius: '4px',
    border: '1px solid #007bff',
    cursor: 'pointer',
  },
};


const ProfileCard = () => {

  const { data: session ,status } = useSession()


    return (
      <div style={styles.card}>
        <Image style={styles.avatar} width={50} height={50} src={session?.user.image || profileDefualtIcon} alt="" / >
         <h2 style={styles.name}>John Doe</h2>
         <p style={styles.title}>Full Stack Developer</p>
        <p style={styles.location}>Bay Area, San Francisco, CA</p>
            <div style={styles.buttonGroup}>
              <button style={styles.followButton}>Follow</button>
              <button style={styles.messageButton}>Message</button>
           </div>
      </div>
    );
  };
  

  
  export default ProfileCard;
  