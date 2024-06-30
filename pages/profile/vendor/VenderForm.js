import React, {useContext} from "react"
import { UserContext} from "Context/Context";
import InputElemnt from "@/components/InputElemnt/InputElemnt"
import Calinder from "@/components/Calinder/Calinder";
import SelectElemnt from "@/components/SelectComponent/SelectComponent"
import { useSession } from "next-auth/react";

 function  VenderForm () {

  const [VenUserdor,setUser]=useContext(UserContext)
  const { data: session ,status ,update} = useSession()



   if(!session){
    return <div>Loading...</div>
   }
  const { user: { name, email, image }, expires } =  session;


    return (
    <form 
        className="vender-form-wrapper" > 
      <h1 > הרשמת נותן שירות   </h1>
      <div className="vendor-form-split1"
      >
       <InputElemnt 
        type={"text"}
        id={"FullName"}
        text={"שם מלא"}  
        contextType={"Vendor"}  
       />

      <InputElemnt 
        type={"tel"}
        id={"Phone"}
        text={"טלפון"}
        contextType={"Vendor"}
      />
      </div>
      <br/>
      <div className=" vendor-form-split2" >
      <InputElemnt
        type={"email"}
        id={"Email"}
        text={"מייל"}
        contextType={"Vendor"}
      />
      
      <InputElemnt
        type={"text"}
        text={"שם העסק"}
        id={"BussniseName"}
        contextType={"Vendor"}
      />

      <InputElemnt
         type={"number"}
         text={"מחיר"}
         id={"Price"}
         contextType={"Vendor"}
      />

      <SelectElemnt
        SelectOptionsArray={["אשרי", "מזומן","ביט" ,"פיפאל"]}
        text={"קבלת תשלום"}
        className="vendor-payment"
        hedlineText={"אפשריות תשלום"}
        contextType={"isVendor"}
      />

     <Calinder
      id={"venderOpenDate"}
      text={" זמין מ"}
     />
     <Calinder
      id={"venderEndDate"}
      text={"סיום"}
     />
   
      <button 
       type="submit"
       className="vender-form-btn"
      >רישום 
      </button>
      </div>
    </form>
      );

      
}

export default VenderForm ;