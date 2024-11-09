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
      <Flex  background={"gray.200"} mt={2} pt={6} direction={'column'} alignItems={"center"} fontWeight={"bold"} >
        
         <Image style={{border:` dotted 5px ${Colors.d}`,padding:"10px", borderRadius:"18px" }}     width={160} height={80} src={session?.user.image || profileDefualtIcon} alt="" />

          <Heading color={Colors.d} >{session?.user?.name.toUpperCase() ?? "אלמוני" }</Heading>
          <Text  p={1} >{session?.user?.email }</Text>
          <Text p={2} >אימייל מאומת : {session?.user?.emailVerified ? "כן" :" לא"}</Text>
      </Flex>
      </m.div>
      </LazyMotion>
    );
  };
  

  
  export default ProfileAvatr;
  