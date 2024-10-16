import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { he } from 'date-fns/locale/he';
import { StateContext } from '../../context'
registerLocale('he', he )



// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';



const Calinder = ({
    id,
    text,
    PropsOnChange,
    STATE_KEY,
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


  const handleChange = (e) => {
    const value = e
    PropsOnChange(id, value);
  };



  return (
    
   <label 
     htmlFor={id}   
     >
    <strong>{text}</strong>
    
     <DatePicker 
        locale={he}
        required
        withPortal
        id={id} 
        selected={startDate} 
        onChange={
          (date) =>{ 
          // data is object   console.log(date)
            setStartDate(date)
            handleChange(date)
            }}
          
        closeOnScroll
        showYearDropdown
        showMonthDropdown
        showTimeSelect
        showFullMonthYearPicker
        showPreviousMonths
        showPopperArrow
        isClearable
        containerRef={"main"}
        className="calindre"
        clearButtonClassName="vendor-calinder-clear-btn"
        popperClassName="vendor-calindr"
        timeIntervals={15}
        dateFormat="PPp"      
       />
     </label>

  );
};

export default Calinder