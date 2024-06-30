import { useSession } from 'next-auth/react'
import {useContext, useEffect,useState} from 'react'
import InputElemnt from '@/components/InputElemnt/InputElemnt'
import { UserContext } from '@Context/Context'
import TextArea from '@/components/TextArea/TextArea'
import Dialog from '@/components/Dialog/Dialog'
import ProfileForm from './ProfileForm'

const ProfileInfo=({state,setState,session})=>{

 const { User,isVendor,isCostumer } = state
    

   if(User.age||!User.about||User.phone){

    return  <Dialog
                id={"profile-info"}
           
                buttonText={"עדכון פרטים"}
                buttonstyle={{width:"150px",height:"70px",border:"none",borderRadius:"15px"}}
                
        >
        
                <ProfileForm/>
                
            </Dialog>
    }

    return <div>{[]}</div>
     
   
}

export default ProfileInfo