import { useEffect , useContext, useState } from 'react';
import { FilterCityContext, WindowWidthContext } from '../../context';
import { useSession } from 'next-auth/react'
import {israelRegions} from '../../app-data'
import Colors from '../../lib/colors'
import { Slider } from '../../components/ui/slider'
import {Field} from '../../components/ui/field'
import { Container ,Flex , Heading, Text} from "@chakra-ui/react"
import { motion , AnimatePresence } from 'framer-motion';

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
        const { xxl,xl,lg,md,sm,xs,xxs } = useContext(WindowWidthContext);


  const cityHendler = (e) => { 
      const value = e.target.value


    setFilterCity(value)
  }



  return (
    <motion.div  >
  
        <Flex   bg={"gray.200"}  direction={"column"}  boxShadow={'0 8px 16px rgba(0, 0, 0, 1)'}>
         <Heading fontSize={"3xl"} p={4} fontWeight={"bold"} textAlign={"center"}  color={Colors.c}> סינן עבדוה לפי </Heading>




          <Flex justifyContent={"center"}>
           <Container maxWidth={600} p={1} m={0}  >
           <Heading p={2} fontSize={xs?"1xl":"medium"} fontWeight={"bold"} >בחר עיר או אזור לראות הזמנות חדשות </Heading>

              <Select
                    size={"lg"}
                    key={"bord"}
                    variant="subtle"
                    id='city'
                    padding={"10px"}  
                    value={filterCity}
                    onChange={cityHendler}
                    fontWeight={"bold"}
                  
                    

          >
               <Option>
                <option value="">   רשימת ערים זמינות </option>
                   {israelRegions.map((obj,i)=>{
                   const city = obj.value
  
                  return <option  id={city}  key={`  ${i}`} value={city} >{city}</option>
             })}   
              </Option>

              </Select>


           <PriceFilter 
                  minPrice={minPrice}  
                  setMinPrice={setMinPrice} 
                  maxPrice={maxPrice} 
                  setMaxPrice={setMaxPrice}

                   />

           </Container>
         </Flex>

        </Flex>

    </motion.div>
) 
}

export default BoardTools 


const PriceFilter =( {minPrice,maxPrice, setMinPrice , setMaxPrice}  )=>{

  const { xxl,xl,lg,md,sm,xs,xxs } = useContext(WindowWidthContext);

  const priceHedler = (e) => {

    const minPercent = e.value[1]
    const maxPercent = e.value[0]
    // evry 1 percent is 3 ISL  

    let minPriceToDisplay =  300 - (minPercent * 3)
    let maxPriceToDisplay = 300- (maxPercent * 3) 
  
    setMinPrice(minPriceToDisplay)
    setMaxPrice(maxPriceToDisplay)

}
 
  return   (  
     <Flex direction={"column"} p={4}>    
              <Heading  fontSize={xs?"1xl":"medium"}  fontWeight={"bold"} >ניתן לסנן הזמנות לפי מחיר שעתי מוצע </Heading>

       <Slider  defaultValue={[0, 100]}  p={4}  onValueChange={priceHedler}  />                 
     
       <Flex justifyContent={'center'} maxWidth={"550px"}  >
     
            <StatRoot >
                  <StatLabel info="מחיר לשעה " >ממחיר</StatLabel>
                  <StatValueText
                      fontSize={"18px"}
                       value={minPrice}
                       formatOptions={{ style: "currency", currency: "ILS" , }}
                    />
           </StatRoot> 
       
            <StatRoot   style={{display:'flex',  flexDirection:'column',justifyContent:'center',alignItems:'end',}}>
                 <StatLabel>עד</StatLabel>
                 <StatValueText
                      fontSize={"18px"}
                      value={maxPrice}
                      formatOptions={{ style: "currency", currency: "ILS" }}
                   />
           </StatRoot>
          
      </Flex>

     </Flex>
)
} 