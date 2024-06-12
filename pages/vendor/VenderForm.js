
import { useState  } from "react";
import ToggleSwitch from "components/ToggleSwitch";
import InputElemnt from "@/components/InputElemnt"


function VenderForm () {

    return (
     <form className="vender-form-wrapper">

       <InputElemnt 
        type={"text"}
        id={"vender-fullname"}
        text={"שם מלא"}  
       />

      <InputElemnt 
        type={"tel"}
        id={"vender-phone"}
        text={"טלפון"}
      />

      <InputElemnt 
        type={"img"}
        id={"vender-img"}
        text={"תמונה"}
      />       
        </form>
      );
}

export default VenderForm ;