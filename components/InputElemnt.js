import { VendorData } from "contaxt/contaxt"
import { useContext, useEffect } from "react"

const InputElemnt = ({
    type,
    text,
    id,
    labeClassName,
    required,
}) => {
        
    const [data,setData] = useContext(VendorData)

    const handleChange = (e) => {
        setData({
            ...data,
            [id]: e.target.value
        });
    };


    return <label 
             htmlFor={id} 
            className={labeClassName? labeClassName:null}
            >
            {text}
            <br/>
             <input 
              required={required? true : false}
              placeholder={required? "*" : null}
              type={type}
              id={id}
              className="vender-input"
              onChange={handleChange}
               />
           </label>
      
    
   }
   export default InputElemnt
   