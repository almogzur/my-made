import { useSession } from 'next-auth/react'
import {useContext, useEffect,useState} from 'react'
import InputElemnt from '@/components/InputElemnt/InputElemnt'
import { UserContext } from '@Context/Context'
import TextArea from '@/components/TextArea/TextArea'
import Dialog from '@/components/Dialog/Dialog'
import ProfileForm from './ProfileForm'
import {  motion } from 'framer-motion'

const ProfileInfo=({state,setState,session})=>{

 const { Info,isVendor,isCostumer } = state


   if(Info.age||!Info.about||Info.phone){


    return <motion.div
            className='profile-info-dialog-motion'
            animate={{
              x:[-400,0]
            }}
           
            transition={{duration:1.5}}
            whileHover={{ }}
            
                >

           <Dialog
                id={"profile-info-dialog"}
                buttonText={"עדכון פרטים"}

            >
        
                <ProfileForm
                        state={state}
                        session={session}
                        setState={setState}
                      
                />
                
            </Dialog>
          </motion.div>
    }

    return <div>{[]}</div>
     
   
}

export default ProfileInfo