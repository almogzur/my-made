import { useContext, useState } from "react"
import {m,LazyMotion} from 'framer-motion'

const loadFeatures = () =>
    import("@/lib/features").then(res => res.default)
  
  

const SideBar  = ({
    children,
    callBack,
    style,
    className
    })=>
    {
        const SideBarhandler = ()=>{}

     return (
        <LazyMotion features={loadFeatures}>
        <m.aside
        className={className?className:null}
        style={{...style}}

        animate={{
                x:[-100,0],
               
            
            }}
            transition={{duration:1}}
        >
        {children}
        </m.aside>
        </LazyMotion> 
            
            
)
}

export default SideBar