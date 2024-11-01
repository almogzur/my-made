import Image from "next/image";
import { useSession } from "next-auth/react";
import profileDefualtIcon from '../../public/User.jpg'
import Colors from "../../lib/colors";


const Style = {
  card: {
    backgroundColor: 'white',
    padding: '20px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    fontWeight: 'bold',
  },
  avatar: {
    width: '130px',
    border:` dotted 3px ${Colors.c} `,
    padding:"10px",
    borderRadius:"6px"
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    
    color: Colors.c,
    
    },
  title: { },
  location: {
    fontSize: '16px',
    padding:"10px"

  },

  
  
};


const ProfileCard = () => {

  const { data: session ,status } = useSession()


    return (
      <div style={Style.card}>
         <Image style={Style.avatar} width={50} height={50} src={session?.user.image || profileDefualtIcon} alt="" />
          <h2 style={Style.name}>{session?.user?.name ?? "אלמוני" }</h2>
          <p style={Style.title}>{session?.user?.email.toUpperCase() }</p>
          <p style={Style.location}>אימייל מאושר : {session?.user?.emailVerified ? "כן" :" לא"}</p>
      </div>
    );
  };
  

  
  export default ProfileCard;
  