import { useContext, useState } from "react"
import { motion } from "framer-motion"

const SideBar  = ({
    children,
    sidebBarClassName,
    callBack,
    
    })=>
    {
        const SideBarhandler = ()=>{}

     return (
        <motion.aside
            animate={{
                x:[-100,0],
               
            
            }}
            transition={{duration:1}}
            className={sidebBarClassName}
        >
        {children}
        </motion.aside>
            
            
            
)
}

export default SideBar