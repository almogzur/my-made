import {
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTitle,
    PopoverTrigger,
  } from "../components/ui/popover"
  import { useState } from "react"
  import { Button, Flex } from "@chakra-ui/react"
  import UiDialog from '../components/dialog/ui-dialog';
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

            <Flex justifyContent={"space-evenly"}  p={2}>
            <Button onClick={()=>setOpen(false)} > סגור </Button>
            <UiDialog 
                buttonStyle={{background:"gray"}}
                buttonText="ערוך"
                >
                <NewOrder id={id} />

            </UiDialog>
            </Flex>

          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    )
  }
  export default ControldPopOvre