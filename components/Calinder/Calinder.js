import React, { useContext, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { he } from 'date-fns/locale/he';
import Colors from "@/lib/colors";
import { StateContext } from "@Context/Context";
registerLocale('he', he )



// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';



const Calinder = ({
    id,
    text,
    placeholder,
    title,
    onChange,
    required,
    STATE_KEY
    }
    ) => {
  
  const [state,setState] = useContext(StateContext)
  const [startDate, setStartDate] = useState( );

 useEffect(()=>{
      const Data = state[STATE_KEY]
      const value = Data[id]
      // if the value is not null
        if(value){
           setStartDate(new Date(value))
           console.log("new date ");
        }
 },[state[STATE_KEY][id]])


  
  const labelStyle = {       
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center', 
      width:"100%",

      }

  const handleChange = (e) => {
    
    const value = e
    onChange(id, value);
  };

  


  return (
   <label 
   htmlFor={id}
     style={labelStyle}
     >
    <strong>{text}</strong>
     <DatePicker 
        locale={he}
        required={required? true:false}
        title={title}
        withPortal
        id={id} 
        selected={startDate} 
        onChange={
          (date) =>{ 
          // data is object   console.log(date)
            setStartDate(date)
            handleChange(date)

            }
          
          }
       
        closeOnScroll
        showYearDropdown
        showMonthDropdown
        showTimeSelect
        showFullMonthYearPicker
        showPreviousMonths
        showPopperArrow
        placeholderText={placeholder}
     
        isClearable
        containerRef={"main"}
        className="vendor-calindre"
        clearButtonClassName="vendor-calinder-clear-btn"
        popperClassName="vendor-calindr"
        timeIntervals={15}
        dateFormat="PPp"
        

   

        
       />
    </label>
  );
};

export default Calinder