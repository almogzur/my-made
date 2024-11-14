
import {
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTrigger,
  } from "../components/ui/popover"
  import { WindowWidthContext } from '../context';
  import { useContext, useState } from 'react';

  import {  Button, Heading, } from '@chakra-ui/react';

  const badge_h = "40px" 
  const badge_w = "60px"
  const na = "מידע לא זמין"

const Popover = ({children, headline ,openTrigerText, position , open ,setOpen  , btnsStyleProps })=>{
    const { xxl,xl,lg,md,sm,xs,xxs} = useContext(WindowWidthContext);
    return (
      <PopoverRoot  h={badge_h} w={badge_w}  open={open} onOpenChange={(e)  => setOpen(e.open)  } positioning={position? position : {}}>
         <PopoverTrigger asChild>
           <Button p={2} fontWeight={"bold"}   {...btnsStyleProps}  >{openTrigerText} </Button>
         </PopoverTrigger>
  
          <PopoverContent portalled={open}>
          <PopoverArrow />
           <PopoverBody > 
              <Heading textAlign={"center"}>{headline}</Heading>
               {children}
               <Button  onClick={()=>setOpen(false)} {...btnsStyleProps}  > סגור   </Button>
          </PopoverBody>
         </PopoverContent>
  
  
      </PopoverRoot>
    )
  
  }
  export default Popover