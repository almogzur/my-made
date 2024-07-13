import Link from "next/link";
import { LazyMotion,m } from "framer-motion"
import { useState } from "react";
import Colors from "@/lib/colors";
import loadFeatures from '@/lib/features'


export default function CostumeLink ({
  href,
  children,
  text,
  motionWrapperStyle,
  linkStyle,
  divStyle,
  onHoverColor  
 })
  {


  return (
 <LazyMotion features={loadFeatures}>

    <m.div
          style={{...motionWrapperStyle }}
          animate={{rotate:360}}
          transition={{ type: "spring" ,duration:5 }}
          whileHover={{rotate:30 }}
          onMouseEnter={(e)=>{
            e.target.style.color = onHoverColor 
           ,e.target.style.transition = "ease 1s"
            }}
          onMouseLeave={(e)=>{e.target.style.color = "" }}

      >    
       <Link 
         id="thiss"
          href={href}
          style={{...linkStyle}}
          
           >
   
           <div 
             
              style={{...divStyle}} 
               >
                {text?text:null}     
                {children}
             </div>
       </Link>
    </m.div>
</LazyMotion>
    )
}


