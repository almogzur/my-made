import React,{useState,useEffect} from 'react'
import InputElemnt from '@/components/InputElemnt/InputElemnt'
import Calendar from "@/components/Calinder/Calinder"
import SelectElemnt from "@/components/SelectComponent/SelectComponent"
import { useSession } from 'next-auth/react'


    const CustomerFrom = ({ })=>{
       const { data: session ,status ,update} = useSession()

/* Form Filds    
location,
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
            
        <form className='customer-form-wrarpper'>
            <h1>הזמנת שירות{session.user?.name} </h1>
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
                className={"vendor-payment"}
            />

            </form>
 
            
        )

     }

     export default CustomerFrom




