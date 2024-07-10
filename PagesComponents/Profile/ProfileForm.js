import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '@Context/Context';
import InputElemnt from '@/components/InputElemnt/InputElemnt';
import TextArea from '@/components/TextArea/TextArea';

const ProfileForm = ({dbAge,dbPhone,dbAbout}) => {

   const STATE_KEY = "Info"
   const { data: session ,status ,update} = useSession()
   const [ state,setState]=useContext(StateContext)

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

   const handleTextAreaChange = (id, value) => {
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
         const response = await fetch('/api/saveuserinfo', { // Change this URL to your actual endpoint
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
    <form onSubmit={ handleInfoSave}>
    <div className='profile-info-section'>
      <h2>עדכון פרטי משתמש</h2>
      <div className='profile-info-split'>
    
        <InputElemnt
          type="text"
          text="גיל"
          id="age"
          labelClassName=""
          required
          inputClassName=""
          value={state.Info.age}
          
          onChange={handleTextAreaChange}
        />
        <InputElemnt
          type="text"
          text="טלפון"
          id="phone"
          labelClassName=""
          required
          inputClassName=""
          value={state.Info.phone}
          onChange={handleTextAreaChange}
        />

      </div>

        <TextArea
          id="about"
          text="עלי"
          value={state.Info.about}
          onChange={handleTextAreaChange} 
      />
      

      {/** User Data Save to db  */}
     <button
          type='submit'
        >{"עדכון"}
          
        </button>
    </div>
    </form>
  );
};

export default ProfileForm;
