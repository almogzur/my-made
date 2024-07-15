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

    <m.div
          style={motionWrapperStyle?motionWrapperStyle:null}
          animate={{rotate:360}}
          transition={{ type: "spring" ,duration:5 }}
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


