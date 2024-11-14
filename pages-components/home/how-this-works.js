import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import Card from './card'
import Colors from '../../lib/colors'
import {Container , Text , Flex} from '@chakra-ui/react'

import { FaPenFancy } from "react-icons/fa";
import { TbViewfinder } from "react-icons/tb";
import { PiCursorClickBold } from "react-icons/pi";


 const HeasLine=  " רוצה למצוא עוזר/ת !?"

const CopyText = {
    1:  {  text : "נרשמים בקלות ומפרסמים " , Icon: FaPenFancy ,   },
    2:  { text : "מחפשים במערכת נוחה ומתקדמת" , Icon: TbViewfinder , },
    3:  { text : " ואתם במחרק של קליק  " , Icon:PiCursorClickBold , }

} 
const HowThisWorks = () => {


    
    return (
      <Flex justifyContent={"space-around"} >
         <Container p={0} m={0} height={"40%"} >

            <Text fontSize={"4xl"} fontWeight={"bolder"} p={4} textAlign={"center"}  >{HeasLine}</Text>
            
            <Flex flexWrap={"wrap"} justifyContent={"space-around"} >
                {Object.values(CopyText)
                    .map((obj, i) => 
                            
                        <Card key={i} text={obj.text} IconEl={obj.Icon} />
                    
                    )}
            </Flex>  
         </Container>
       </Flex>
    );
};

export default HowThisWorks;



//  עברתי על כול רחיב והעברתי ל צקרה 