import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer"
import { For, Heading , Flex ,Button ,Container } from "@chakra-ui/react";
import { BsArrowBarLeft } from "react-icons/bs";
import { BsArrowBarRight } from "react-icons/bs";
import Colors from "../../lib/colors";
import DrawerItem from './drawer-item'
import { FcButtingIn , FcCustomerSupport } from "react-icons/fc";

import {   FcViewDetails, FcPlus , FcHome, FcCancel } from "react-icons/fc";
import { signOut ,signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import useUser from '../../lib/hooks/useUser'

import {m,LazyMotion} from 'framer-motion'
import f from "../../lib/features"
import { useRouter } from "next/router";
import Image from 'next/image'



const  MyDrawer = () => {

  const { data: session, status } = useSession();
  const {user , isLoading , isError} = useUser(session?.user?.email)
  const router = useRouter()

    return (
      <DrawerRoot   >

        {/** background when open */}
        <DrawerBackdrop  />

        {/** open btn */}
         <DrawerTrigger asChild  width={"60px"} height={"inherit"} p={2} mr={"2px"}>
         
                <BsArrowBarLeft  color={router.pathname === "/profile" ? "": Colors.a} />
          
         </DrawerTrigger>


        <DrawerContent offset="3" rounded="0"    >

      
          <DrawerHeader  p={0}  >

            <Flex p={2} direction={"row-reverse"} justifyContent={"space-between"} >

                <DrawerCloseTrigger    variant="solid" p={0} m={0} colorPalette="" position={"unset"}   color={"#fff"}   />
            
                { session &&

                 <Flex gap={3} alignItems={"center"} p={1} >

                    <Image   height={40} width={42} src={session?.user?.image } alt="" style={{borderRadius:4}} />

                      <Heading >{session?.user?.name ?? "" }</Heading>
                </Flex>
          }
               </Flex>

        
               

  
              
              
            </DrawerHeader>




          <DrawerBody  >  
  
              <DrawerItem PropsOnClick={ () => router.push("/") } text={"דף הבית"} Icon={<FcHome size={"2em"}  />  } animationIndex="1" />

              <DrawerItem        
                           text={ session?.user?.name? "ההזמנות שלי " :  "הרשמה | כניסה "} 
                           Icon={<FcButtingIn size={"2em"}/>}
                           PropsOnClick={()=>{ session? router.push("/profile") : signIn(undefined,{callbackUrl:"/profile"})   }}
                           animationIndex={1.5} 
              />
              { session  &&
                 <DrawerItem text={user?.Vendor?.isVendor ?  "ניהול לקוחות" : "הרשמה כנותן שירות "} Icon={<FcCustomerSupport size={"2em"}/> }  PropsOnClick={()=>{router.push("/vendor") }} animationIndex="2.3"  />
              }
                   { user?.Vendor?.isVendor &&
              
                 <DrawerItem text={" לוח לקוחות "} Icon={<FcViewDetails size={"2em"}/>} PropsOnClick={()=>router.push("/bord")} animationIndex="1.9"  /> 
                 
                 }

          </DrawerBody>

          <DrawerFooter>
             <LazyMotion features={f} >
               { status && status==="authenticated" && 
                 <m.button      
                     initial={{ opacity: 0, x: 300 }}
                     animate={{ opacity: 1, x:0 }}
                     transition={{ duration: 1 , type:"spring" }}
                     whileInView={{ opacity: 1, y: 0 }}
                     whileHover={{ scale: 1.1, boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.5)" , color:Colors.c}} 
                     style={{
                        width:"60%" ,
                        boxShadow:"0px 4px 12px rgba(0, 0, 0, 0.4)",
                        height:"60px" ,
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-around',
                        alignItems:'center',
                        fontSize:"16px"
                         }}
                      onClick={()=>signOut()}
                    >{"התנתק"}{<FcCancel size={"2em"}/>}
                 </m.button> 
               }

              
                <DrawerActionTrigger height={"60px"} p={3} width={"40%"} asChild >

                  <m.button      
                     initial={{ opacity: 0, x: 300 }}
                     animate={{ opacity: 1, x:0}}
                     transition={{ 
                       x:{duration: 1.5} ,
                      duration:1
                        }}
                     whileInView={{ opacity: 1, y: 0 }}
                     whileHover={{ scale: 1.1, boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.5)" , color:Colors.c}} 
                     style={{boxShadow:"0px 4px 12px rgba(0, 0, 0, 0.4)"  , display:'flex',justifyContent:'space-around',alignItems:'center'}}
                     >  
                        <BsArrowBarRight size={"2.5em"} />
                     </m.button>
                    </DrawerActionTrigger>

                
             </LazyMotion>
          </DrawerFooter>
        
        </DrawerContent>  

      </DrawerRoot>
    )
  }



  export default MyDrawer



  