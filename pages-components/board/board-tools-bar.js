import { useEffect , useContext } from 'react';
import { FilterCityConteax } from '../../context';
import { useSession } from 'next-auth/react'
import { FaThList } from "react-icons/fa";
import { PiCardsThin } from "react-icons/pi";
import RegionSelect from '../../components/select-city/select'
import MultiRangeSlider from '../../pages-components/board/multi-range-input'
import Colors from '../../lib/colors'

const Style = {
    Wrapper:{
        width:"100%",
        height:"70px",
        boxShadow: `0 2px 4px ${Colors.d}`,
        display:"flex"
        
    },
    DisplayMode:{
      height:"70px",
      width:"140px",
      display:"flex"
    },
    DisplayModeButtom:{
      width:"60px",
      height:"70px",
      border:"none",
      background:Colors.d,
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      
    },
    Filter:{

     width:"100%",
     display:'flex',
     flexDirection:'column',
    },
    RegionSelect:{
         width:"80%",
         marginRight:"10%",
         border:"none",
      
    }
}


const BoardToolsBar=({
        setMode,
        setFilterPriceArray,
       })=>{

  const { data: session ,status ,update} = useSession()
  const [filterCity, setFilterCity] = useContext(FilterCityConteax);


 
  

  const cityHendler = (id,value) => { setFilterCity(value);}

  const priceHedler = (min,max) => {setFilterPriceArray([min,max])}



  return (
     <div  style={Style.Wrapper}>
     {/* DisplayMode */}  

      <div style={Style.DisplayMode}>
         <button
            style={Style.DisplayModeButtom}
            onClick={()=>setMode("List")}
         ><FaThList size={25}/>  רשימה
        </button>

        <button
           style={Style.DisplayModeButtom} 
            onClick={()=>setMode("Cards")}
         >    <PiCardsThin size={25}/> כרטיסים 
        </button> 
      </div>

     {/* Filter By */}
      <div style={Style.Filter}>
          
          <RegionSelect 
            propsId="filter-date"
            PropsStyle={Style.RegionSelect}
            PropsOnChange={cityHendler}
           
           
          />
          {filterCity  &&   
            <MultiRangeSlider
              min={0}
              max={300}
              PropsOnChange={({min,max})=>priceHedler(min,max)}    
          />   
          }

      </div>

  </div>
) 
}

export default BoardToolsBar 