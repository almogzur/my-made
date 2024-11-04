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
import { BsArrowBarLeft } from "react-icons/bs";
import { BsArrowBarRight } from "react-icons/bs";
import Colors from "../../../lib/colors";
import {GiVacuumCleaner} from "react-icons/gi"
import DrawerItem from './drawer-item'
import { FcButtingIn } from "react-icons/fc";
import { FcOnlineSupport , FcViewDetails } from "react-icons/fc";
import { FcPlus } from "react-icons/fc";
import { signOut ,signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { color } from "framer-motion";
import useUser from '../../../lib/hooks/useUser'


const MyDrawer = () => {

  const { data: session, status } = useSession();
  const {user , isLoading , isError} = useUser(session?.user?.email)

    const router = useRouter()

    return (
      <DrawerRoot   >

        {/** background when open */}
        <DrawerBackdrop  />

        {/** open btn */}
         <DrawerTrigger asChild background={{}} width={"60px"} height={"inherit"} p={2} mr={"2px"}>

                <BsArrowBarLeft  color="#fff" />
          



         </DrawerTrigger>


        <DrawerContent offset="3" rounded="0"    >

        

          <DrawerHeader style={{background:Colors.d , color:"#fff" }}  >



             <GiVacuumCleaner style={{
                                 padding:"0px" , 
                                 marginTop:"-10px" ,
                                 cursor: "pointer",      
                                  }}
                                 size={"3em"} 
                                 color="#fff" 
                                 onClick={()=>{router.push("/")}}  
                              />


                              
            </DrawerHeader>




          <DrawerBody  style={{ background:Colors.d}}  >

                <DrawerItem 
                    text={ session?.user?.name??  "הרשמה | כניסה "} 
                    PropsOnClick={()=>{ session? router.push("/profile") : signIn(undefined,{callbackUrl:"/profile"})   }}
                    > 
                     <FcButtingIn  style={{margin:"10px"}} size={"2em"}/>
                </DrawerItem>



                <DrawerItem text={ " פירסום מודעה " }>
                      <FcPlus size={"2em"} style={{margin:"10px"}}   />
                </DrawerItem>
                    
                {user?.Vendor?.isVendor &&
                  <DrawerItem  text={"לוח עבודות "} 
                      PropsOnClick={()=>{router.push("/bord")}}
                  >
                    <FcViewDetails size={"2em"} style={{margin:"10px"}}/>
                </DrawerItem> }


                <DrawerItem  text={"צור קשר "}>
                    <FcOnlineSupport size={"2em"} style={{margin:"10px"}}/>
                </DrawerItem>

             

                
                
          </DrawerBody>



          <DrawerFooter 
             style={{  height:100 , background:Colors.d}} 
              >

           { status && status==="authenticated" ?  
                    <DrawerItem 
                        text={"התנקת"}
                        propsStyle={{ 
                            padding:"0px" ,
                            margin:"0px",
                            background:"#333333",
                            color:Colors.c,
                            justifyContent:"center"
                           }}
                         PropsOnClick={()=>{signOut()}}
             /> :
             null
             }

            <DrawerActionTrigger asChild>

              <Button variant=""
                 style={{ 
                   border: "none",
                   width: "50%",
                   height: "60px",
                   borderRadius: "px",
                   backgroundColor: "#333",      
                   color: "#fff",                  
                   fontSize: "16px",             
                    fontWeight: "600",           
                    cursor: "pointer",             
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4)",
                      }}  
                  >Close
                 <BsArrowBarRight/>
              </Button>

            </DrawerActionTrigger>

          
          </DrawerFooter>

          <DrawerCloseTrigger  style={{  padding:"5px" , color:"#fff" }}  />


        </DrawerContent>
        
      </DrawerRoot>
    )
  }



  export default MyDrawer



  