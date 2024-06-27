import Select, { Option } from 'rc-select';
import { VendorContaxt ,UserContaxt,CostumrContaxt} from 'contaxt/contaxt';
import { useContext, useState } from 'react';



const SelectElemnt =  ({
   id,
   hedlineText,
   SelectOptionsArray,
   className,
   contextType
   }) => 
    {
     const [Vendor, setVendor] = useContext(VendorContaxt);
  

      const handleChange = (value) => {
         setVendor((prevState) => ({
           ...prevState,
           vendorPaymentOptions: value 
        }));
      };

    return(
      <label
        htmlFor={id}
        style={{display:"flex",flexDirection:"column"}}
      >
      {hedlineText}
  
      <Select
         animation={"slide-up"}
         mode='multiple'
         className={className}
         value={Vendor.id}
         onChange={handleChange}
       >
        {SelectOptionsArray.map((option,i)=>{
          return <Option value={option} key={i} >{option}</Option>
      })
      }
      </Select>
  </label>
    )
   
}
export default SelectElemnt