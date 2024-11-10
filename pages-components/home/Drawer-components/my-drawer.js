import { Button } from "../../../components/ui/button"
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
} from "../../../components/ui/drawer"
import { For, Heading , Flex } from "@chakra-ui/react";
import { BsArrowBarLeft } from "react-icons/bs";
import { BsArrowBarRight } from "react-icons/bs";
import Colors from "../../../lib/colors";
import DrawerItem from './drawer-item'
import { FcButtingIn } from "react-icons/fc";
import {   FcViewDetails, FcPlus , FcHome, FcCancel } from "react-icons/fc";
import { signOut ,signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import useUser from '../../../lib/hooks/useUser'

import {m,LazyMotion} from 'framer-motion'
import f from "../../../lib/features"
import { useRouter } from "next/router";

const  MyDrawer = () => {

  const { data: session, status } = useSession();
  const {user , isLoading , isError} = useUser(session?.user?.email)
  const router = useRouter()
  const animationIndex = 1

    return (
      <DrawerRoot   >

        {/** background when open */}
        <DrawerBackdrop  />

        {/** open btn */}
         <DrawerTrigger asChild  width={"60px"} height={"inherit"} p={2} mr={"2px"}>

                <BsArrowBarLeft  color={Colors.b} />
          
         </DrawerTrigger>


        <DrawerContent offset="3" rounded="0"    >

      
          <DrawerHeader  p={3}  >
              <Flex justifyContent={"flex-end"} p={0} m={0} >
                <DrawerCloseTrigger    variant="solid" p={4}  colorPalette="" position={"unset"}   color={"#fff"} borderRadius={3}   />
              </Flex>
            </DrawerHeader>




          <DrawerBody  >  
  
              <DrawerItem PropsOnClick={ () => router.push("/") } text={"דף הבית"} Icon={<FcHome size={"2em"} animationIndex={1} /> } />
              <DrawerItem        
                           text={ session?.user?.name??  "הרשמה | כניסה "} 
                           Icon={<FcButtingIn size={"2em"}/>}
                           PropsOnClick={()=>{ session? router.push("/profile") : signIn(undefined,{callbackUrl:"/profile"})   }}
                           animationIndex={1.5} 
              />
              { user?.Vendor.isVendor &&
                 <DrawerItem text={"לוח"} Icon={<FcViewDetails size={"2em"}/>} PropsOnClick={()=>router.push()} animationIndex={1.9}  /> }
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



  