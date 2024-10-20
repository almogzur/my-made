import { useSession } from 'next-auth/react'
import Colors from '../../lib/colors'
import { FaThList } from "react-icons/fa";
import { PiCardsThin } from "react-icons/pi";
import RegionSelect from '../../components/select-city/select'
import MultiRangeSlider from '../../pages-components/board/multi-range-input'
import { useEffect } from 'react';



const Style = {
    Wrapper:{
        width:"100%",
        height:"50px",
        boxShadow: `0 2px 4px ${Colors.d}`,
        display:"flex"
    },
    DisplayMode:{
      width:"50%",
      height:"inherit",
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

const filterOrdersByCity = (cityArg, OrdersArg) => {   
  console.log(OrdersArg);
  
  let temp = [];

  if (!cityArg) return [];

  for (const key in OrdersArg) {
    const cityJobList = OrdersArg[key];
    console.log(key);
    

    // If the key (city) matches the provided cityArg, add its orders to the temp array
    if (key === cityArg) {
     
      
      temp = [...cityJobList];
      break; 
    }
  }

  
  return temp;
}

const BoardToolsBar=({
        staticOrders,
        setMode,
        setFilterCity,
        setFilterPriceArray,
        setRenderList,
        renderList,
       })=>{

  const { data: session ,status ,update} = useSession()
  

  const cityHendler = (id,value) => {

    setFilterCity(value);
    setRenderList(filterOrdersByCity(value,staticOrders));
  }

  const priceHedler = (min,max) => {setFilterPriceArray([min,max])}



useEffect(()=>{
    console.log(renderList);
    
},[renderList])


   if (status === 'loading' ) {
     return <h1 style={{textAlign:'center'}}>Loading Orders ...</h1>
}

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

          <MultiRangeSlider
                min={0}
                max={300}
                PropsOnChange={({min,max})=>priceHedler(min,max)}
          />
      </div>

  </div>
) 
}

export default BoardToolsBar 