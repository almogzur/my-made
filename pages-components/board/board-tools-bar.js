import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import Colors from '../../lib/colors'
import { FaThList } from "react-icons/fa";
import { PiCardsThin } from "react-icons/pi";
import RegionSelect from '../../components/select-city/select'
import MultiRangeSlider from '../../pages-components/board/multi-range-input'
import { background } from '@chakra-ui/react';

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
      
        height:"100%",
        width:"100%",
        display:'flex',
        flexDirection:'column',
        
   
        

    },
}
const OrdersWrapper=({
        Mode,
        setMode,
        displayCity,
        setDisplayCity
       })=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()

  useEffect(()=>{ })

  const cityHendler = () => {}




    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>


   // add perent state hndler 
     const handleChange = (e) => {
      const id = e.target.id;
      const value = e.target.value;
  
      setState(prevState => ({
        ...prevState,
        [STATE_KEY]: { ...prevState[STATE_KEY], [id]: value }
      }));
    };
    
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
          <RegionSelect 
            propsId="filter-date"
            PropsStyle={{border:"none" , width:"100%"  }}
            PropsPlaceholder={"סינון לפי אזור"}
            PropsOnChange={cityHendler}
   
          />

          <MultiRangeSlider
                min={0}
                max={100}
                onChange={
                  ({ min, max }) => console.log(`min = ${min}, max = ${max}`)}


          />
        </div>

  </div>
) 
}

export default OrdersWrapper 