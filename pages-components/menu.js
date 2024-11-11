import useUser from "../lib/hooks/useUser";
import { signIn, signOut, useSession } from "next-auth/react";
import Colors from "../lib/colors"
import {   FcViewDetails ,FcPlus , FcHome, FcButtingIn } from "react-icons/fc";
import { ImExit } from "react-icons/im";

import Link from "next/link";
import { GiVacuumCleaner } from "react-icons/gi";
import {  Box, Button, Container, Flex, For, Heading, Text} from "@chakra-ui/react";
import { useRouter } from "next/router";


const Menu = () => {

  const { data: session ,status } = useSession()
  const {user , isLoading , isError} = useUser(session?.user?.email)

 const isVendor =   user?.Vendor?.isVendor
 //{text :,Icon:<FcButtingIn size={"2em"}/>, href:"profile"},
     const routr = useRouter()
     const pathName = routr.pathname

     

     return (
        <Flex mb={3}   background={Colors.d}  boxShadow={ "0px 10px 26px rgba(0, 0, 0, 0.5)"} p={2}  >
           <Flex width={"40%"}   alignItems={"center"} justifyContent={"center"}  >
                  <Container p={0} m={2}><GiVacuumCleaner  size={"3em"}  color={"black"}/></Container>
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
                 onClick={()=> session? routr.push("/profile"): signIn(undefined, { callbackUrl: '/profile' }) }
                 width={"120px"}
                 fontWeight={600}
                 justifyContent={"space-around"}



                 >
                 {session?.user?.name ? "פרופיל אישי" :  "הרשמה|כניסה "}
                </Button>
                :null
               }




               {isVendor && pathName !== "/bord" ? 
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
                :null
               }
         
               {session? 
                <Button 
                 m={3}
                 colorPalette={"red"} 
                 variant={"solid"} 
                 borderRadius={10} 
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
  )
}
export default Menu




