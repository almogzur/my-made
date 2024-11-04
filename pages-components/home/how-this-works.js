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
        <Container height={"40%"} background={Colors.d}>

            <Text fontSize={"4xl"} textAlign={"center"} color={"#fff"} >{HeasLine}</Text>
            
            <Flex flexWrap={"wrap"} justifyContent={"space-around"} >
                {Object.values(CopyText)
                    .map((obj, i) => 
                            
                        <Card key={i} text={obj.text} IconEl={obj.Icon} />
                    
                    )}
            </Flex>  
        </Container>
    );
};

export default HowThisWorks;



//  עברתי על כול רחיב והעברתי ל צקרה 