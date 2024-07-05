import Link from "next/link";
import { motion } from "framer-motion";

export default function CostumeLink ({
  href,
  children,
  text,
  motionWrapperStyle,
  linkStyle,
  divStyle,
 })
  {

    


    return (
      <motion.div
          style={ motionWrapperStyle?motionWrapperStyle:null}
          animate={{rotate:360}}
          transition={{ type: "spring" ,duration:5 }}
          whileHover={{
         rotate:30,
           }}

      >
       <Link 
        shallow={true}
        
         href={href}
         style={linkStyle ? linkStyle :null}
       
           >
        <div 
         style={divStyle?divStyle:null}
        
        >
           {text?text:null}     
           {children}
      </div>
      </Link>
      </motion.div>
    )
}


