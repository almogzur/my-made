import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../context';
import InputElemnt from '../../components/input-elemnt/index'
import TextArea from '../../components/text-area'
import Colors from '../../lib/colors';
import {m,LazyMotion} from "framer-motion"
import { WindowWidthContaxt } from '../../context';
import f from "../../lib/features"




const ProfileForm = ({dbPhone}) => {

   const STATE_KEY = "Info"
   const { data: session ,status ,update} = useSession()
   const [ state,setState]=useContext(StateContext)
 


  /// chake the db vs the state and update the fileds
   useEffect(() => {
    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: {
        phone: dbPhone || prevState[STATE_KEY].phone
        }
    }));
  }, [ dbPhone,  setState]);

   const handleChange = (id, value) => {
    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: {
        ...prevState[STATE_KEY],
        [id]: value
      }
    }));
  };
   const handleInfoSave = async () => {
       try {
        const options = { 
          method: 'POST',
          headers: {'Content-Type': 'application/json' },
          body : JSON.stringify(state.Info)  
          }
         const response = await fetch('/api/saveuserinfo',options );

         if (response.ok) {
                 // Handle success
              console.log('Profile updated successfully');
             }
         else {
              // Handle errors
               console.error('Failed to update profile');
  }
  }
         catch (error) {
          console.error('Error updating profile:', error);
               }
  }

  return (

    <form 
      onSubmit={ handleInfoSave} 
      style={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
      }}
      >
       <h2 style={{textAlign:"center"}}>עדכון משתמש</h2> 

       <InputElemnt
          type="tel"
          text="טלפון"
          id="phone"
          required
          value={state.Info.phone}
          PropsOnChange={handleChange}
        />

      
        <LazyMotion features={f}>
          <m.button
         type='submit'
         style={{  
              border: `1px solid ${Colors.b}`,
              borderRadius: "3px",
              padding: "10px",
              margin: "10px 0",
              boxShadow: `2px 1px 1px ${Colors.c}`,
              background:"#fff",
              width:"100%"
              }}
          whileHover={{scale:1.1 ,  duration:1}} 
          transition={{ duration: 1 }}
        >
        <strong>עדכון פרטים</strong>  
          </m.button>
        </LazyMotion>
 
    </form>
  );
};

export default ProfileForm;
