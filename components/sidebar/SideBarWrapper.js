import { useContext, useState } from "react"
import { PageWidth } from "contaxt/contaxt"

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