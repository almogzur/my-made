import { useState } from "react"


const SideBar  = ({
    children,
    className,
    callBack
    })=>
    {
  const [ isOpen ,setIsOpen ] =useState(false)  

        const SideBarhandler = ()=>{}
   
     return (
        <aside
          style={{width : isOpen? "100px":"50px"}}
            className={className}
        >
        {children}

        <button
          onClick={()=>setIsOpen(!isOpen)}
        >{isOpen? "opem":"close"}</button>
        </aside>
            
            
            
)
}

export default SideBar