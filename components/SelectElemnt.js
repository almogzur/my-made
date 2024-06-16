import Select, { Option } from 'rc-select';
import { VendorData } from 'contaxt/contaxt';
import { useContext, useState } from 'react';



const SelectElemnt =  ({id,hedlineText,SelectOptions, }) => {

    const [fromData,setFromData]=useContext(VendorData)

    const handleChange = (value) => {
      setFromData((prevState) => ({
          ...prevState,
          vendorPaymentOptions: value 
        }));
      };

    return(
<label
  htmlFor={id}
  style={{display:"flex",flexDirection:"column",alignItems:"center"}}
  >{hedlineText}
  
  <Select
   animation={"slide-up"}
   className='vendor-payment'
   mode='multiple'
   value={fromData.vendorPaymentOptions}
   onChange={handleChange}
  >
  {SelectOptions.map((option,i)=>{
    return <Option value={option} key={i} >{option}</Option>
  })}
    <Option value="paypal">פייפאל</Option>
    <Option value="crdit">אשרי</Option>
    <Option value="cash">מזומן</Option>
    <Option value="ביט">ביט</Option>
  </Select>
  </label>
    )
   
}
export default SelectElemnt