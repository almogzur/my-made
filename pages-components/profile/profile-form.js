import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../context';
import InputElemnt from '../../components/input-elemnt/index'
import TextArea from '../../components/text-area/text-area'
import Colors from '../../lib/colors';
import {m,LazyMotion} from "framer-motion"
import { WindowWidthContaxt } from '../../context';
import f from "../../lib/features"




const ProfileForm = ({dbAge,dbPhone,dbAbout}) => {

   const STATE_KEY = "Info"
   const { data: session ,status ,update} = useSession()
   const [ state,setState]=useContext(StateContext)
   const [width, setWidth] = useState("");
   const {md,sm} =useContext(WindowWidthContaxt)
 


  /// chake the db vs the state and update the fileds
   useEffect(() => {
    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: {
        age: dbAge || prevState[STATE_KEY].age,
        phone: dbPhone || prevState[STATE_KEY].phone,
        about: dbAbout || prevState[STATE_KEY].about,
      }
    }));
  }, [dbAge, dbPhone, dbAbout, setState]);

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
         const response = await fetch('/api/saveuserinfo', 
          { 
             method: 'POST',
              headers: {
                 'Content-Type': 'application/json',
                    },
                   body : JSON.stringify(state.Info)  
           });
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
    <LazyMotion features={f}>

    <form 
      onSubmit={ handleInfoSave} 
      style={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        marginTop:"-100px"
      
      
      }}
    >
         <h2 style={{textAlign:"center"}}>עדכון פרטי משתמש</h2> 


        <InputElemnt
          type="text"
          text="גיל"
          id="age"
          required
          value={state.Info.age}
          onChange={handleChange}
        />
        <InputElemnt
          type="text"
          text="טלפון"
          id="phone"
          required
          value={state.Info.phone}
          onChange={handleChange}
        />
        <TextArea
          id="about"
          text="עלי"
          value={state.Info.about}
          onChange={handleChange} 
          resize={false}
          
      />
      

     <m.button
          type='submit'
          style={{  
              border: `1px solid ${Colors.b}`,
              borderRadius: "6px",
              padding: "10px",
              margin: "10px 0",
              boxShadow: `2px 1px 1px ${Colors.c}`,
              background:"#fff",
              width:"100%"
              }}
          whileHover={{scale:1.1 ,  duration:1}} 
          transition={{ duration: 1 }}
        ><strong>עדכון פרטים</strong>
          
        </m.button>

    </form>
    </LazyMotion>
  );
};

export default ProfileForm;
