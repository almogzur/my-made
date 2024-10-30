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
import { useContext } from "react";
import { WindowWidthContaxt } from "../../../context";
import Colors from "../../../lib/colors";
import {GiVacuumCleaner} from "react-icons/gi"
import DrawerItem from './drawer-item'
import { color } from "framer-motion";

const MyDrawer = () => {
    const { XLarge, large, medium ,small } = useContext(WindowWidthContaxt);

    return (
      <DrawerRoot   >

        {/** background when open */}
        <DrawerBackdrop  />

        {/** open btn */}
        <DrawerTrigger asChild>

          <Button style={{border:"none" , width:"70px" }}  variant="" size="full">
                <BsArrowBarLeft size={"2em"} color="#fff" />
          </Button>



         </DrawerTrigger>


        <DrawerContent offset="3" rounded="0"    >

          


          <DrawerHeader style={{background:Colors.d , color:"#fff" }}  >
             <GiVacuumCleaner style={{padding:"0px",marginTop:"-10px"}} size={"3em"} color={Colors.c}  />
          </DrawerHeader>




          <DrawerBody  style={{ background:Colors.d}}  >

                <DrawerItem text={"הרשמה"}/>
                <DrawerItem text={"פירסום מודעה "}/>
                <DrawerItem  text={"צור קשר "} />
                
                


             
          </DrawerBody>



          <DrawerFooter 
             style={{  height:100 , background:Colors.d}} 
              >
            <DrawerItem text={"התנקת"} propsStyle={{margin:"0px", padding:"0px" , background:"#333333"}} />

            <DrawerActionTrigger asChild>

              <Button variant=""
                 style={{ 
                   border: "none",
                   width: "50%",
                   height: "60px",
                   borderRadius: "9px",
                   backgroundColor: "#333",      
                   color: "#fff",                  
                   fontSize: "16px",             
                    fontWeight: "600",           
                    cursor: "pointer",             
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4)",
                    color:Colors.c
                      }}  
                  >Close
                 <BsArrowBarRight/>
              </Button>

            </DrawerActionTrigger>

          
          </DrawerFooter>

          <DrawerCloseTrigger  style={{background:Colors.c , padding:"5px"}}  />


        </DrawerContent>
        
      </DrawerRoot>
    )
  }



  export default MyDrawer



  