import useUser from "../lib/hooks/useUser";
import { signIn, signOut, useSession } from "next-auth/react";
import Colors from "../lib/colors"
import {   FcViewDetails ,FcPlus , FcHome, FcButtingIn , FcCustomerSupport } from "react-icons/fc";
import { ImExit } from "react-icons/im";

import Link from "next/link";
import { GiVacuumCleaner } from "react-icons/gi";
import {  Box, Button, Container, Flex, For, Heading, Text} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {  WindowWidthContext } from '../context';
import { useEffect , useContext, useState } from 'react';
import Image from "next/image";


const Menu = () => {

  const { data: session ,status } = useSession()
  const {user , isLoading , isError} = useUser(session?.user?.email)

 const isVendor =   user?.Vendor?.isVendor
 //{text :,Icon:<FcButtingIn size={"2em"}/>, href:"profile"},
     const routr = useRouter()
     const pathName = routr.pathname
     const { xxl,xl,lg,md,sm,xs,xxs } = useContext(WindowWidthContext);

     

     return ( 
      <Flex justifyContent={"center"}>
        <Container p={0} m={0}>
          <Flex mb={3}   background={Colors.d}  boxShadow={ "0px 10px 26px rgba(0, 0, 0, 0.5)"}  p={2}  >
           <Flex width={"40%"}   alignItems={"center"} justifyContent={"center"}  >
                  <Container p={0} m={2}><GiVacuumCleaner  size={"3em"}  color={"black"}/></Container>
                  <Flex  alignItems={"center"}  justifyContent={"space-evenly"} >

       <UserInfo/>
        </Flex>
           </Flex>
        
          <Flex  width={"60%"}  justifyContent={"end"} alignItems={"center"}  >


               { pathName !== "/" ?
               
               <Link href={"/"}>
                <Button 
                 m={3}
                 p={2}  
                  justifyContent={"space-around"}
                 variant={"solid"} 
                 boxShadow={ "4px 0px 2px rgba(0, 0, 0, 0.3)"}
                 width={"120px"}
                 fontWeight={600}

                 >
                 {"בית"}{<FcHome />}

               </Button> 
               </Link>  
               :null 
               }

               { pathName !== "/profile" ?
                 <Button 
                 m={3}
                 p={2}  
                 variant={"solid"} 
                 boxShadow={ "4px 0px 2px rgba(0, 0, 0, 0.3)"}
                 width={"120px"}
                 fontWeight={600}
                 justifyContent={"space-around"}
                 onClick={()=> session? routr.push("/profile"): signIn(undefined, { callbackUrl: '/profile' }) }



                 >
                 {session?.user?.name ? "הזמנות" :  "הרשמה|כניסה "}
                 <FcButtingIn/>

                </Button>
                :null
               }




               {isVendor && pathName !== "/bord" &&
                <Link href="bord" >
                <Button
                 m={3} 
                 boxShadow={ "4px 0px 2px rgba(0, 0, 0, 0.3)"}
                   p={2} 
                   variant={"solid"} 
                   width={"120px"}
                   fontWeight={600}
                   justifyContent={"space-around"}
                >
                 <Text>לוח</Text>
                 <FcViewDetails/>
                </Button>
                </Link>
                
               }
               {isVendor && pathName !=="/vendor" &&
                <Link  href={"./vendor"} >
                <Button 
                 m={3}
                 p={2}  
                 variant={"solid"} 
                 boxShadow={ "4px 0px 2px rgba(0, 0, 0, 0.3)"}
                 width={"120px"}
                 fontWeight={600}
                 justifyContent={"space-around"}
                 >
                  לקוחות
                  <FcCustomerSupport size={"2em"} />
                 </Button>
                 </Link>
               }
         
               {session? 
               
                <Button 
                 m={3}
                 colorPalette={"red"} 
                 variant={"solid"} 
                 boxShadow={ "4px 0px 2px rgba(255, 0, 0, 0.3)"}
                 onClick={()=>signOut()}
                 width={"120px"}
                 fontWeight={600}
                 color={"#fff"}
                 alignItems={"center"}
                 justifyContent={"space-around"}


                 >
                 {"התנתק"}{<ImExit />}
                </Button>
               :
               null 
               }
          </Flex>

         </Flex>
        </Container>
        </Flex>
  )
}
export default Menu

const UserInfo = ()=>{

  const { data: session ,status } = useSession()
  const {user , isLoading , isError} = useUser(session?.user?.email)
  const { xxl,xl,lg,md,sm,xs,xxs } = useContext(WindowWidthContext);

  return (    
        <>
        {session  &&
          <>
          <Image   style={{ border:` dotted 3px ${Colors.d}`,  marginLeft:30}} height={40} width={65} src={session?.user?.image } alt=""  />

          <Flex fontWeight={"bolder"} justifyItems={"center"}   fontSize={!sm? "small" :"larger"} >

                <Flex  direction={"column"}>
                 <Heading >{session?.user?.name.toUpperCase() ?? "אלמוני" }</Heading>
                 <Text fontSize={"md"} >{session?.user?.email.toLocaleUpperCase() }</Text>
                 <Text  fontSize={"md"}  >אימייל מאומת : {session?.user?.emailVerified ? "כן" :" לא"}</Text>
                </Flex>
          </Flex>
          </>
     }
     </>

  )
}




