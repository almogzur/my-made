import { useContext, useState } from "react"
import { motion } from "framer-motion"

const SideBar  = ({
    children,
    callBack,
    style,
    className
    })=>
    {
        const SideBarhandler = ()=>{}

     return (
        <motion.aside
        className={className?className:null}
        style={style?style:null}

        animate={{
                x:[-100,0],
               
            
            }}
            transition={{duration:1}}
        >
        {children}
        </motion.aside>
            
            
            
)
}

export default SideBar