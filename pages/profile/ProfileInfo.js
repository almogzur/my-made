import { useSession } from 'next-auth/react'
import {useContext, useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import LoadingSpinner from '@/components/Loader/LoadingSpinner'
import { UserData } from 'contaxt/contaxt'
import InputElemnt from '@/components/InputElemnt/InputElemnt'



const ProfileInfo=({UserObject})=>{

    const router = useRouter()
    const { data: session ,status ,update} = useSession()
    const {age ,about , phone , CoverImg } = UserObject

    useEffect(()=>{
        console.log(UserObject)
    })

    return (
        <section
         className='profile-info-section'
        >
        {
            UserObject.age? User.age :

        <InputElemnt
            type={"text"}
            text={"גיל"}
            id="age"
            labeClassName={"profile-age"}

        />
        
        }
            
        </section>
) 
}

export default ProfileInfo