import InputElemnt from "@/components/InputElemnt"
import Calinder from "@/components/Calinder";

function VenderForm () {
 
    return (
     <form 
        className="vender-form-wrapper" 
        action={"/api/vendorreg/newvender"}
     >
       <InputElemnt 
        type={"text"}
        id={"venderFullName"}
        text={"שם מלא"}  
       />

      <InputElemnt 
        type={"tel"}
        id={"venderPhone"}
        text={"טלפון"}

      />

      <InputElemnt
        type={"email"}
        id={"vendorEmail"}
        text={"מייל"}

      />
      
      <InputElemnt
        type={"text"}
        text={"שם העסק"}
        id={"venderBussniseName"}


      />
      <InputElemnt
         type={"number"}
         text={"מחיר"}
         id={"price"}
         required
      />

     <label for="fruits">דרכי קבלת תשלום</label>
        <select id="fruits" name="fruits" multiple size="5">
            <option value="apple">פייפל</option>
            <option value="banana">אשרי</option>
            <option value="cherry">ביט</option>
            <option value="date">מזומן</option>
            <option value="grape"></option>
        </select>


        <Calinder text={"זמין מ "}/>
        <Calinder text={"עד"}/>
   
      <button type="submit">הרשמת נותן שירות </button>
        </form>
      );

      
}

export default VenderForm ;