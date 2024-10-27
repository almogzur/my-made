import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'


const CopyText = {

    HeasLine : " רוצה למצוא עוזרת ?", 
    text1 : "נרשמים בקלות ומפרסמים מודעה",
    text2 : "מחפשים במערכת נוחה ומתקדמת" , 
    text3 : "פונים בקליק ומקבלים תשובה... או מחכים לפניות" , 
    text4 : "ויוצרים קשר"
} 


const HowThisWorks=()=>{



return (<div>{Object.entries(CopyText).values()}</div>) 
}

export default  HowThisWorks