
import Dialog from '@/components/Dialog/Dialog'
import ProfileForm from '@pages/profile/ProfileForm'
import {  motion } from 'framer-motion'
import Colors from '@/lib/colors'




const ProfileInfo=({state,setState,session})=>{

  // db qury if user have the Info saved 
  // then will render Info else Render Form 


    return <motion.div

            animate={{
              x:[-400,0]
            }}
           
            transition={{duration:1}}
            whileHover={{ }}
            
                >

           <Dialog
              buttonText={"עדכון פרטים"}

              buttonStyle={{
                      height:"100px",
                      marginTop:"15px",
                      width:'40%',
                      border:"none",
                      borderRadius:"15px",
                      background:Colors.b,
                      boxShadow: "0 4px 2px #404040",
                      
                }}

                wrapperStyle={{
                      display:'flex',
                      flexDirection:'column',
                      justifyContent:'center',
                      alignItems:'center',
                      alignContent:'center',
                }}
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