
import Dialog from '@/components/Dialog/Dialog'
import ProfileForm from '@pages/profile/ProfileForm'
import {  motion } from 'framer-motion'




const ProfileInfo=({state,setState,session})=>{



  // db qury if user have the Info saved 
  // then will render Info else Render Form 

  let  UserDBInfo  ;




    return <motion.div
            className='profile-info-dialog-motion'
            animate={{
              x:[-400,0]
            }}
           
            transition={{duration:1}}
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


     
   


export default ProfileInfo