import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import Colors from '../../lib/colors'

const CopyText = {

    HeasLine : " רוצה למצוא עוזרת ?", 
    text1 : "נרשמים בקלות ומפרסמים מודעה",
    text2 : "מחפשים במערכת נוחה ומתקדמת" , 
    text3 : "פונים בקליק ומקבלים תשובה... או מחכים לפניות" , 
    text4 : "ויוצרים קשר"
} 


const HowThisWorks=()=>{
    
    const Style = { 
        Wrapper:{
            height:"30em",
            width:"100%",
            background:Colors.d
        }
    }
    
    return (
        <div style={Style.Wrapper}>

        </div>
    )


}

export default  HowThisWorks 