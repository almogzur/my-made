import Image from "next/image";
import { useSession } from "next-auth/react";
import profileDefualtIcon from '../../public/User.jpg'
import { use } from "react";



const Style = {
  card: {
    backgroundColor: 'white',
    padding: '20px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',


  },
  avatar: {
    width: '80px',
    borderRadius: '0%',

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
      <div style={Style.card}>
         <Image style={Style.avatar} width={50} height={50} src={session?.user.image || profileDefualtIcon} alt="" / >

          <h2 style={Style.name}>{session?.user?.name ?? "אלמוני" }</h2>

          <p style={Style.title}>{session?.user?.email.toUpperCase() }</p>
          <p style={Style.location}>אימייל מאושר : {session?.user?.emailVerified ? "כן" :" לא"}</p>
            <div style={Style.buttonGroup}>

           </div>


      </div>
    );
  };
  

  
  export default ProfileCard;
  