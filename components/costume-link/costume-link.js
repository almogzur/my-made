import Link from "next/link";
import { LazyMotion,m } from "framer-motion"
import f from  '../../lib/features'


export default function CostumeLink ({
  href,
  children,
  text,
  linkStyle,
  divStyle,
  onHoverColor,  
  motionWrapperStyle
 })
  {


  return (
 <LazyMotion features={f}>

    <div
          style={motionWrapperStyle?motionWrapperStyle:null}

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
    </div>
</LazyMotion>
    )
}


