import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import Card from './card'
import Colors from '../../lib/colors'
import {Container} from '@chakra-ui/react'

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



    const Style = { 
        Wrapper: {
            height: "40%",
            background: Colors.d,    
        },
        Cards: {
            display: "flex",
            flexWrap:"wrap",
            justifyContent: 'space-around',
        },
        HeasLine:{ 
            textAlign: "center",
             padding: "5px",
              fontSize: "40px" ,
              color:"#fff",
            }
    };
    
    return (
        <Container style={Style.Wrapper}>
            <h1 style={Style.HeasLine}>{HeasLine}</h1>
            <div style={Style.Cards}>
                {Object.values(CopyText)
                    .map((obj, i) => 
                            
                        <Card key={i} text={obj.text} IconEl={obj.Icon} />
                    
                    )}
            </div>  
        </Container>
    );
};

export default HowThisWorks;