import { useSession } from 'next-auth/react'
import Colors from '../../lib/colors'
import { FaThList } from "react-icons/fa";
import { PiCardsThin } from "react-icons/pi";
import RegionSelect from '../../components/select-city/select'
import MultiRangeSlider from '../../pages-components/board/multi-range-input'

const Style = {
    Wrapper:{
        width:"100%",
        height:"50px",
        boxShadow: `0 2px 4px ${Colors.d}`,
        display:"flex"
        
    },
    DisplayMode:{
     width:"130px",
      height:"inherit",
      display:"flex"
    },
    DisplayModeButtom:{
      width:"60px",
      height:"50px",
      border:"none",
      background:Colors.d,
      
    },
    Filter:{
        height:"100%",
        width:"100%",
        display:'flex',
        flexDirection:'column',
    },
}


const BoardToolsBar=({
        setMode,
        setFilterCity,
        setFilterPriceArray,
        filterCity
       })=>{

  const { data: session ,status ,update} = useSession()
  

  const cityHendler = (id,value) => { setFilterCity(value);}

  const priceHedler = (min,max) => {setFilterPriceArray([min,max])}



  return (
    <div  style={Style.Wrapper}>
     {/* DisplayMode */}  

      <div style={Style.DisplayMode}>
   <button
     style={Style.DisplayModeButtom}
     onClick={()=>setMode("List")}
     >
     <FaThList size={25}/>
     רשימה
   </button>

    <button
      style={Style.DisplayModeButtom} 
      onClick={()=>setMode("Cards")}>
      <PiCardsThin size={25}/>
      כרטיסים
   </button> 
      </div>

     {/* Filter By */}
      <div 
         style={Style.Filter}
          >
          <RegionSelect 
            propsId="filter-date"
            PropsStyle={{border:"none" , width:"100%"  }}
            PropsPlaceholder={"אזור"}
            PropsOnChange={cityHendler}
           
          />

    {      filterCity !== "" ?   // only render the price selector if city is != fulsy
              <MultiRangeSlider
                min={0}
                max={300}
                PropsOnChange={({min,max})=>priceHedler(min,max)}
                
          />
          :null
          }

      </div>

  </div>
) 
}

export default BoardToolsBar 