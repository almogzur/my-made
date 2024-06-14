import Select, { Option } from 'rc-select';
import { VendorData } from 'contaxt/contaxt';
import { useContext, useState } from 'react';


const SelectElemnt =  () => {

    const [data,setData]=useContext(VendorData)

    const handleChange = (value) => {
        setData((prevState) => ({
          ...prevState,
          vendorPaymentOptions: value 
        }));
      };

    return(

  <Select
   animation={"slide-up"}
   mode='multiple'
   value={data.vendorPaymentOptions}
   onChange={handleChange}
  >
    <Option value="jack">jack</Option>
    <Option value="lucy">lucy</Option>
    <Option value="yiminghe">yiminghe</Option>
  </Select>
    )
}
export default SelectElemnt