import React,{useState,useEffect,nav} from 'react'
import InputElemnt from '@/components/InputElemnt/InputElemnt'
import Calendar from "@/components/Calinder/Calinder"
import SelectElemnt from "@/components/SelectComponent/SelectComponent"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'


    const CustomerFrom = ({ })=>{

       const { data: session ,status ,update} = useSession()
       const router = useRouter()

       useEffect(()=>{
    
        if (status === "unauthenticated" ) {
         router.push("/")
    
     }
    },[])
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

            <h1>הזמנת שירות{session?.user?.name} </h1>

            <InputElemnt
                text={"שם הלקוח"}
                type={"text"}
                contextType={"Customer"}
                id="FullName" 
            />

            <InputElemnt
                type={"number"}
                text={"מספר חדרים "}
                contextType={"Customer"}
                id="Phone" 
            />
           
            <InputElemnt
                text={"מספר מקלחות"}
                contextType={"Customer"}
            />
             <Calendar
                text={"זמין ב"}
            />
            <SelectElemnt
                SelectOptionsArray={["פיפאל","אשראי","ביט","מזומן"]}
                className={"vendor-payment"}
            />

            <InputElemnt
                text={"מיקום"}
                type={"location"}
                contextType={"Customer"}
                id={"location"}
            />


            </form>
 
            
        )

     }

     export default CustomerFrom




