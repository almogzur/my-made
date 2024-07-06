import Link from "next/link";
import { LazyMotion,m } from "framer-motion"

const loadFeatures = () =>
  import("@/lib/features").then(res => res.default)


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
      <LazyMotion features={loadFeatures}>
            <m.div
                style={ motionWrapperStyle?motionWrapperStyle:null}
                animate={{rotate:360}}
                transition={{ type: "spring" ,duration:5 }}
                 whileHover={{
                 rotate:30,
           }}

      >
       <Link 
          prefetch={true}
        
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
      </m.div>
</LazyMotion>
    )
}


