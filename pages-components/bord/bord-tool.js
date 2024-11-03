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
        const {xl,lg,md,sm} = useContext(WindowWidthContext)


const Style = {
  Wrapper:{
      background:"#fff",


  },
  BtnsWrap:{
        display:'flex',
        justifyContent:'space-around',
        border:` solid 1px ${Colors.c} ` ,
        borderRadius:"4px",
        padding:"10px",   
  },
   FiltersWrap:{
    display:'flex',
    flexDirection:"column",
    borderRadius:"8px",
    padding:"10px",

    
  },
   Btn:{
       display:'flex',
       justifyContent:'space-evenly',
       alignItems:'center',
       width:"120px",
       height:"50px",   
       color: Colors.c,
       border: 'none',
       borderRadius: '5px',
       cursor: 'pointer',
       fontSize: '1rem',
       fontWeight: 'bold',
       background:"lightgray"
       
       
  },
   FilterItem:{
    padding:"10px"
  }


}

  const cityHendler = (id,value) => { setFilterCity(value);}

  const priceHedler = (min,max) => {setFilterPriceArray([min,max])}



  return (
     <div  style={Style.Wrapper}>
        <Container maxWidth={600} padding={"15px"} >

           <div style={Style.BtnsWrap} >

         <button
            onClick={()=>setMode("List")}
            style={Style.Btn}
              >
              <FaThList size={25}/>  רשימה
        </button>

        <button 
              style={Style.Btn}
              onClick={()=>setMode("Cards")}
         >   
          <PiCardsThin size={25}/> כרטיסים 
        </button> 
           </div>
 
          <div style={Style.FiltersWrap} >

             <div style={Style.FilterItem}  >
              <Field label="בחר עיר" size={"sm"} />
                <Select
                    size={"lg"}
                    key={"bord"}
                    placeholder="אזור"
                    variant="subtle"
                    id='city'
                    paddingTop={"20px"}
          >
               <Option>
              <option >אזור</option>
                  {israelRegions.map((obj,i)=>{
                  const city = obj.value
  
                  return <option  id={city}  key={`  ${i}`} value={city} >{city}</option>
             })}   
              </Option>
                </Select>
              
             </div>
 
          
          <Flex direction="row"   justify="space-between" >

             <StatRoot style={{display:'flex',flexDirection:'column',alignItems:'start',alignContent:'center',}}  >
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

            
          </div> 

        </Container>
     </div>
) 
}

export default BoardTools 