import { Button } from "../../components/ui/button"
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
  

import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import Logo from '../../public/dark-logo.webp'
import Colors from "../../lib/colors"



const SideBard = () => {


    const Style = {
       Wrapper:{
            margin:"10px"
       }
      }



    return (
        <nav style={Style.Wrapper}>
          <Bar/>
        </nav>
      
    )
  }
  
  export default SideBard



  const Bar = () => {
    return (
      <DrawerRoot>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
    <TbLayoutSidebarRightExpandFilled/>
          </Button>
        </DrawerTrigger>
        <DrawerContent offset="4" rounded="md">
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerActionTrigger>
            <Button>Save</Button>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    )
  }
  