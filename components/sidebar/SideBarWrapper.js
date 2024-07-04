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
                rotate:360,
            
            }}
            transition={{duration:2}}
            className={sidebBarClassName}
        >
        {children}
        </motion.aside>
            
            
            
)
}

export default SideBar