import DatePicker from "react-datepicker";
import React, { useState } from "react";
import { he } from 'date-fns/locale/he';
import { registerLocale, setDefaultLocale } from  "react-datepicker";




// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Calinder = ({text}) => {

    registerLocale('he', he)


  const [startDate, setStartDate] = useState(new Date());

  return (
  <div
        id="calinder"
  >

    <DatePicker 
    selected={startDate} 
    onChange={(date) => setStartDate(date)}
    showTimeSelect
    locale={he}


     />
  </div>
  );
};

export default Calinder