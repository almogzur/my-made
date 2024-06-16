import React,{useState} from 'react'
import InputElemnt from '@/components/InputElemnt'
import Calendar from "components/Calinder"
import StarRating from '@/components/StarRating'
import ToggleSwitch from '@/components/ToggleSwitch'
import SelectElemnt from '@/components/SelectElemnt'

    const CustomerFrom = ({
        children
    })=>
        {
    const [ ,set] =useState(null)


/*    location,
    aparment-size , 
    ditale-expation , 
    avalbilati,
    numberOfSowers , 
    cliningetirealsexloded ,

    extra {
        windows , 
        stars , 
        wherhowse ,
        driveway,
        yards,
 */

        return (
            <div className='customer-form-wrarpper'>
            <InputElemnt
                text={"שם הלקוח "}
                type={"text"}
            />
            <InputElemnt
                type={"number"}
                text={"מספר חדרים "}
            />
            <Calendar
                text={"זמין ב"}
            />
            <InputElemnt
                text={"מיקום"}
            />
            <InputElemnt
                text={"מספר מקלחות"}
            />
            <SelectElemnt
                SelectOptions={["פיפאל","אשראי","ביט","מזומן"]}
            />

            </div>
        )

     }

     export default CustomerFrom




