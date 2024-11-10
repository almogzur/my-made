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

const ControldPopOvre = ({children ,id , propsKey}) => {

    const [open, setOpen] = useState(false)

    return (
      <PopoverRoot key={propsKey} open={open} onOpenChange={(e) => setOpen(e.open)}>

        <PopoverTrigger asChild>

          <Button  p={4} size="sm" colorPalette={""}  variant="subtle" >פרטים </Button>

         </PopoverTrigger>

        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            {children}

            <Flex  justifyContent={"space-evenly"}  p={2}>
             <Button onClick={()=>setOpen(false)} > סגור </Button>
          
             <DialogRoot scrollBehavior="inside" >
                    <DialogTrigger asChild>
                     <Button variant="outline" size="sm">ערוך הזמנה   </Button>
                 </DialogTrigger>

                  <DialogContent>
                      <DialogHeader>
                      <DialogTitle>Dialog Title</DialogTitle>
                      </DialogHeader>

                      <DialogBody>
                         <NewOrder id={id} />    
                      </DialogBody>

                      <DialogFooter>
                          <DialogActionTrigger asChild>
                          <Button variant="outline">Cancel</Button>
                          </DialogActionTrigger>
                          <Button>Save</Button>
                      </DialogFooter>

                   <DialogCloseTrigger />

                 </DialogContent>
             </DialogRoot>
            </Flex>

          </PopoverBody>
        </PopoverContent>


      </PopoverRoot>
    )
  }
  export default ControldPopOvre