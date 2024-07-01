import { useSession } from 'next-auth/react'
import {useContext, useEffect,useState} from 'react'
import InputElemnt from '@/components/InputElemnt/InputElemnt'
import { UserContext } from '@Context/Context'
import TextArea from '@/components/TextArea/TextArea'
import Dialog from '@/components/Dialog/Dialog'
import ProfileForm from './ProfileForm'
import {  motion } from 'framer-motion'

const ProfileInfo=({state,setState,session})=>{

 const { User,isVendor,isCostumer } = state


   if(User.age||!User.about||User.phone){


    return <motion.div
            className='profile-info-dialog-motion'
            animate={{
                rotate:[7,0,-7,0]
            }}
           
            transition={{duration:1}}
            whileHover={{rotate:[7,0,7,0]}}
            
                >

           <Dialog
                id={"profile-info-dialog"}
           
                buttonText={"עדכון פרטים"}
                buttonstyle={{width:"150px",height:"70px",border:"none",borderRadius:"15px"}}
                
        >
        
                <ProfileForm/>
                
            </Dialog>
          </motion.div>
    }

    return <div>{[]}</div>
     
   
}

export default ProfileInfo