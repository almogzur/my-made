import {
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTitle,
    PopoverTrigger,
  } from "../components/ui/popover"
  import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog"

  import { useState } from "react"
  import { Button, Container, Flex } from "@chakra-ui/react"
import Colors from "../lib/colors";
import NewOrder from  '../pages-components/profile/profile-new-order'

const ControldPopOvre = ({children ,id ,index}) => {

    const [open, setOpen] = useState(false)

    return (
      <PopoverRoot  key={id + index + " pop_over "} open={open} onOpenChange={(e) => setOpen(e.open)}>

         <PopoverTrigger asChild>
           <Button  p={4} size="sm" colorPalette={""}  variant="subtle" >פרטים </Button>
         </PopoverTrigger>

          <PopoverContent >
          <PopoverArrow />
           <PopoverBody >
          
            {children}
            {/* Dialog  */}
             <Flex  justifyContent={"space-evenly"}  p={2}>
              <Button onClick={()=>setOpen(false)} > סגור </Button>
          
              <DialogRoot key={id + index + "edit_dialog"}  asChild  scrollBehavior="inside" > 

                    <DialogTrigger asChild>
                     <Button variant="outline" size="sm">ערוך הזמנה   </Button>
                    </DialogTrigger>

                  <DialogContent  >
                      <DialogHeader>
                      <DialogTitle>{"form"}</DialogTitle>
                      </DialogHeader>

                      <DialogBody  style={{direction:"rtl"}} >
                        <NewOrder id={id} />    
                      </DialogBody>

                      <DialogFooter>
                          <DialogActionTrigger asChild>
                          <Button variant="outline">סגור</Button>
                          </DialogActionTrigger>
                         
                      </DialogFooter>

                   <DialogCloseTrigger variant="solid"  /> {/** this is passed by pros.children to the chukra CloseButton  */}

                 </DialogContent>
             </DialogRoot>

            </Flex>

          </PopoverBody>
         </PopoverContent>


      </PopoverRoot>
    )
  }
  export default ControldPopOvre