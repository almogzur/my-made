import { useContext, useState } from "react"


const SideBar  = ({
    children,
    sidebBarClassName,
    callBack,
    
    })=>
    {
        const SideBarhandler = ()=>{}

     return (
        <aside
            className={sidebBarClassName}
        >
        {children}
        </aside>
            
            
            
)
}

export default SideBar