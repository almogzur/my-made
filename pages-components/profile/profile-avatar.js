import Image from "next/image";
import { useSession } from "next-auth/react";
import profileDefualtIcon from '../../public/User.jpg'
import Colors from "../../lib/colors";
import {   Heading ,Text ,Flex } from "@chakra-ui/react";
import { LazyMotion, m } from "framer-motion";
import f from '../../lib/features'




const ProfileAvatr = () => {

  const { data: session ,status ,update} = useSession()



    return (
      <LazyMotion features={f} >
      <m.div
       initial={{opacity:0}}
       animate={{opacity:1}}
       transition={{duration:2 }}
    >
      <Flex background={"#fff"} p={"20px"} direction={'column'} alignItems={"center"} fontWeight={"bold"} >
        
         <Image style={{border:` dotted 3px ${Colors.c}`,padding:"6px" }}    width={130} height={50} src={session?.user.image || profileDefualtIcon} alt="" />

          <Heading color={Colors.c} >{session?.user?.name ?? "אלמוני" }</Heading>
          <Text p={1} >{session?.user?.email.toUpperCase() }</Text>
          <Text p={2} >אימייל מאושר : {session?.user?.emailVerified ? "כן" :" לא"}</Text>
      </Flex>
      </m.div>
      </LazyMotion>
    );
  };
  

  
  export default ProfileAvatr;
  