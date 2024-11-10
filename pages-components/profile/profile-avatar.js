import Image from "next/image";
import { useSession } from "next-auth/react";
import profileDefualtIcon from '../../public/User.jpg'
import Colors from "../../lib/colors";
import {   Heading ,Text ,Flex, Container, Box } from "@chakra-ui/react";
import { LazyMotion, m } from "framer-motion";
import f from '../../lib/features'
import { useContext } from "react";
import { WindowWidthContext } from "../../context";
import {AspectRatio} from '@chakra-ui/react'

const ProfileAvatr = () => {

  const { data: session ,status ,update} = useSession()
  const { xxl,xl,lg,md,sm,xs,xxs } = useContext(WindowWidthContext);



    return (
      <LazyMotion features={f} >
      <m.div
       initial={{opacity:0}}
       animate={{opacity:1}}
       transition={{duration:2 }}
    >
      
      <Flex p={4} background={"gray.200"}   justifyContent={"center"}  >

        <Flex  alignItems={"center"} flexBasis={"100%"} maxWidth={"900px"} justifyContent={"space-evenly"} >

          <Flex  justifyContent={"flex-end"} >
      
         <Image 
          style={{
            border:` dotted 3px ${Colors.d}`,
            borderRadius:"18px" ,
            objectFit:"cover",
            margin:"10px",
            padding:"10px"
            }}
            height={0}
            width={120}
            src={session?.user.image || profileDefualtIcon} alt="" 
          />
      
          </Flex>
      

        <Flex direction={"column"}   fontSize={!sm? "small" :"larger"} >
           <Heading  color={Colors.d} >{session?.user?.name.toUpperCase() ?? "אלמוני" }</Heading>
           <Text   >{session?.user?.email }</Text>
           <Text  >אימייל מאומת : {session?.user?.emailVerified ? "כן" :" לא"}</Text>
          </Flex>
          </Flex>
      </Flex>

      </m.div>
      </LazyMotion>
    );
  };
  

  
  export default ProfileAvatr;
  