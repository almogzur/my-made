import { useEffect , useContext, useState } from 'react';
import { FilterCityContext, WindowWidthContext } from '../../context';
import { useSession } from 'next-auth/react'
import { FaThList } from "react-icons/fa";
import { PiCardsThin } from "react-icons/pi";
import {israelRegions} from '../../app-data'
import Colors from '../../lib/colors'
import { Slider   } from '../../components/ui/slider'
import {Field} from '../../components/ui/field'
import { Container ,Flex , Text} from "@chakra-ui/react"

import { StatLabel, StatRoot, StatValueText } from "../../components/ui/stat"
import { NativeSelectField  as Option,NativeSelectRoot as Select,} from "@chakra-ui/react"


const BoardTools=({
        setMode,
        setFilterPriceArray,
       })=>{
        
        const [filterCity, setFilterCity] = useContext(FilterCityContext);
        const { data: session ,status ,update} = useSession()
        const [ minPrice, setMinPrice ] = useState(0)
        const [ maxPrice , setMaxPrice ] = useState(300)



  const cityHendler = (e) => { 
      const value = e.target.value


    setFilterCity(value)
  }

  const priceHedler = (e) => {

            const minPercent = e.value[1]
            const maxPercent = e.value[0]
            // evry 1 percent is 3 ISL  

            let minPriceToDisplay =  300 - (minPercent * 3)
            let maxPriceToDisplay = 300- (maxPercent * 3) 
          
            setMinPrice(minPriceToDisplay)
            setMaxPrice(maxPriceToDisplay)
        
  }



  return (
     <Container background={"#fff"} >
         <Text textStyle={"2xl"} p={2} fontWeight={"bold"} textAlign={"center"}  color={Colors.c}> סינן עבדוה לפי </Text>

        <Container maxWidth={600} padding={"15px"} p={5} >

           <Field label="עיר" size={"sm"}  />
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





                        
           <Flex justifyContent={'center'} maxWidth={"550px"} >

             <StatRoot >
                    <StatLabel info="מחיר לשעה " >ממחיר</StatLabel>
                    <StatValueText
                        fontSize={"18px"}
                         value={minPrice}
                         formatOptions={{ style: "currency", currency: "ILS" }}

                      />
             </StatRoot> 
              
             <StatRoot  style={{display:'flex',  flexDirection:'column',justifyContent:'center',alignItems:'end',}}>
                   <StatLabel>עד</StatLabel>
                   <StatValueText
                        fontSize={"18px"}
                        value={maxPrice}
                        formatOptions={{ style: "currency", currency: "ILS" }}
                     />
             </StatRoot>
                 
           </Flex>

          <Container maxWidth={"500px"} >
                <Slider    defaultValue={[0, 100]}   onValueChange={priceHedler}  />
          </Container>
        </Container>

    </Container>
) 
}

export default BoardTools 