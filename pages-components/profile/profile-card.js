import Image from "next/image";
import { useSession } from "next-auth/react";
import profileDefualtIcon from '../../public/User.jpg'
import Colors from "../../lib/colors";
import {   Heading ,Text ,Flex } from "@chakra-ui/react";


const Style = {
  card: {

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
      <Flex background={"#fff"} p={"20px"} direction={'column'} alignItems={"center"} fontWeight={"bold"} >
         <Image style={Style.avatar} width={50} height={50} src={session?.user.image || profileDefualtIcon} alt="" />
          <Heading style={Style.name}>{session?.user?.name ?? "אלמוני" }</Heading>
          <Text style={Style.title}>{session?.user?.email.toUpperCase() }</Text>
          <Text style={Style.location}>אימייל מאושר : {session?.user?.emailVerified ? "כן" :" לא"}</Text>
      </Flex>
    );
  };
  

  
  export default ProfileCard;
  