import {
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTrigger,
  } from "./ui/popover"


import { useState } from "react"
import { Button, Container, Flex ,Heading,Text} from "@chakra-ui/react"
import NewOrder from  '../pages-components/profile/profile-new-order'
import { useContext  } from "react"
import { WindowWidthContext } from "../context"

const ControldPopOvre = ({children ,id ,index}) => {

  const { xxl,xl,lg,md,sm,xs,xxs} = useContext(WindowWidthContext);


    const [open, setOpen] = useState(false)
    const [openChildren , setOpenChildren ] = useState(false)

    return (
      <PopoverRoot lazyMount  key={id + index + " pop_over "} open={open} onOpenChange={(e)  => setOpen(e.open) }>

         <PopoverTrigger asChild>
           <Button  p={4} size="sm" colorPalette={""}  variant="subtle" >פרטים </Button>
         </PopoverTrigger>

          <PopoverContent portalled={open}>
          <PopoverArrow />


           <PopoverBody > 
              <Heading textAlign={"center"}>פרטי ההזמנה </Heading>
               {children}
      


             <Flex  justifyContent={"space-evenly"}  p={2}>
              <Button onClick={()=>setOpen(false)} > סגור לשונית  </Button>

               <PopoverRoot  open={openChildren} onOpenChange={(e)=>setOpenChildren(e.open)}    >

                   <PopoverTrigger asChild>
                    <Button variant="solid" >  עדכון הזמנה </Button>

                  </PopoverTrigger>


            <PopoverContent portalled={false} >


          
              <PopoverBody> 
                    <NewOrder id={id} setPerent={setOpenChildren} />   
                    <Button onClick={()=>setOpenChildren(false)} >  סגור לשונית  </Button>

               </PopoverBody>

             </PopoverContent>


               </PopoverRoot> 

            </Flex>

          </PopoverBody>

         </PopoverContent>


      </PopoverRoot>
    )
  }
  export default ControldPopOvre