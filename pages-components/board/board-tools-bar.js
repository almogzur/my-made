import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import Colors from '../../lib/colors'
import { FaThList } from "react-icons/fa";
import { PiCardsThin } from "react-icons/pi";
import Select from '../../components/select-city/select'



const Style = {
    Wrapper:{
        width:"100%",
        height:"50px",
    
        boxShadow: `0 2px 4px ${Colors.d}`,
        display:"flex"
    },
    DisplatMode:{
      width:"50%",
      height:"inherit",
      display:'flex',
      justifyContent:'flex-start',
    },
    DisplayModeButtom:{
      width:"60px",
      height:"50px",
      border:"none",
      background:Colors.d,
      marginLeft:"5px"
      
    },
    Filter:{
        width:"100%"
    },
}



const BoardToolsBar=({
        Mode,
        setMode,
        displayCity,
        setDisplayCity
       })=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()

  useEffect(()=>{ })

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
  <div  style={Style.Wrapper}>
     {/* DisplayMode */}  

      <div style={Style.DisplatMode}>
  <button
    style={Style.DisplayModeButtom}
    onClick={()=>setMode("List")}
    >
    <FaThList size={25}/>
  </button>
  <button
    style={Style.DisplayModeButtom} 
    onClick={()=>setMode("Cards")}>
    <PiCardsThin size={25}/>
  </button> 
      </div>

     {/* Filter By */}
       <div 
         style={Style.Filter}
          >
          <Select 
    
            PropsStyle
            PropsPlaceholder={"סינון לפי אזור"}
          />
          <input 
             type="number" 
             placeholder='סינון לפי מחיר' 
           />
      </div>


  </div>
) 
}

export default BoardToolsBar