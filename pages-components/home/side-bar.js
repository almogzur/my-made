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
import { BsArrowBarLeft } from "react-icons/bs";
import { BsArrowBarRight } from "react-icons/bs";
import Colors from "../../lib/colors"
import { useRouter } from "next/router";
import LogoComponent from '../../components/logo/logo'
import MainLogo from '../../public/main-maid-logo.webp'

const SideBard = () => {

  const router = useRouter()


    const Style = {
       Wrapper:{
            display:"flex",
            height:"80px",
            background:Colors.d
            
       }
      }

    return (
        <div style={Style.Wrapper}>
          <Bar/>
          <LogoComponent
            path={"/"}
            propsStyle={{ height:"inherit", width:"80px", position:"absolute", left:"0px"}} 
            imamge={MainLogo}
            height={80}
          />
        </div>
      
    )
  }
  
  export default SideBard



  const Bar = () => {
    return (
      <DrawerRoot>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button style={{border:"none" , width:"70px"}} variant="" size="full">
                <BsArrowBarLeft size={"2em"} color="#fff" />
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
              <Button variant="outline">
              Close
              <BsArrowBarRight/>
              </Button>
            </DrawerActionTrigger>

          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    )
  }
  