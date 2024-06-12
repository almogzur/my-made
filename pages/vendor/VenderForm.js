
import { useState  } from "react";
import ToggleSwitch from "components/ToggleSwitch";
import InputElemnt from "@/components/InputElemnt"


function VenderForm () {

    return (
     <form 
     className="vender-form-wrapper" 
     action={"/api/vendorreg/newvender"}
     >

       <InputElemnt 
        type={"text"}
        id={"vender-fullname"}
        text={"שם מלא"}  
        labeClassName={""}
        inputClassName={"vender-input"}
       />

      <InputElemnt 
        type={"tel"}
        id={"vender-phone"}
        text={"טלפון"}
        
        inputClassName={"vender-input"}
        labeClassName={""}

      />

      <InputElemnt
        type={"email"}
        id={"vendor-email"}
        text={"מייל"}
        
        inputClassName={"vender-input"}
        labeClassName={""}

      />
      
      <InputElemnt
        type={"text"}
        text={"שם העסק"}
        id={"business-"}
        inputClassName={"vender-input"}
        labeClassName={""}

        

      />
      <button type="submit">Submit</button>
        </form>
      );
}

export default VenderForm ;