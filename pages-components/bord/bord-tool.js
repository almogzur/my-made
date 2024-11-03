import { useEffect , useContext, useState } from 'react';
import { FilterCityContext, WindowWidthContext } from '../../context';
import { useSession } from 'next-auth/react'
import { FaThList } from "react-icons/fa";
import { PiCardsThin } from "react-icons/pi";
import {israelRegions} from '../../app-data'
import Colors from '../../lib/colors'
import { Slider   } from '../../components/ui/slider'
import {Field} from '../../components/ui/field'
import { Container ,Flex} from "@chakra-ui/react"

import { StatLabel, StatRoot, StatValueText } from "../../components/ui/stat"
import { NativeSelectField  as Option,NativeSelectRoot as Select,} from "@chakra-ui/react"


const BoardTools=({
        setMode,
        setFilterPriceArray,
       })=>{
        
        const [filterCity, setFilterCity] = useContext(FilterCityContext);
        const { data: session ,status ,update} = useSession()



const Style = {
  Wrapper:{
      background:"#fff",


  },



}

  const cityHendler = (e) => { 
      const value = e.target.value
    setFilterCity(value)
  }

  const priceHedler = (min,max) => {setFilterPriceArray([min,max])}



  return (
     <Container background={"#fff"}>
        <Container maxWidth={600} padding={"15px"} >

           <Field label="בחר עיר" size={"sm"}  />
           <Select
                    size={"lg"}
                    key={"bord"}
                    placeholder="אזור"
                    variant="subtle"
                    id='city'
                    padding={"10px"}  
                    value={filterCity}
                    onChange={cityHendler}

          >
               <Option>
              <option >אזור</option>
                  {israelRegions.map((obj,i)=>{
                  const city = obj.value
  
                  return <option  id={city}  key={`  ${i}`} value={city} >{city}</option>
             })}   
              </Option>
           </Select>
                        
           <Flex >

             <StatRoot >
                    <StatLabel>ממחיר</StatLabel>
                    <StatValueText
                        fontSize={"18px"}
                         value={935.4}
                         formatOptions={{ style: "currency", currency: "ILS" }}
                      />
             </StatRoot> 
              
             <StatRoot  style={{display:'flex',  flexDirection:'column',justifyContent:'center',alignItems:'end',}}>
                   <StatLabel>עד</StatLabel>
                   <StatValueText
                        fontSize={"18px"}
                        value={935.4}
                        formatOptions={{ style: "currency", currency: "ILS" }}
                     />
             </StatRoot>
                 
           </Flex>

          <Slider    defaultValue={[0, 60]} />
          
        </Container>
    </Container>
) 
}

export default BoardTools 