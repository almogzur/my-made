import { useState } from "react"

const SideBar  = ({
    children,
    className,
    
    })=>
    {
  const [ isOpen ,setIsOpen ] =useState(false)  
        const SideBarhandler = ()=>{}
   
     return (
        <aside
            className={className}

        >
        {children}

        </aside>
            
            
            
)
}

export default SideBar