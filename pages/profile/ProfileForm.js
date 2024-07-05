import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@Context/Context';
import InputElemnt from '@/components/InputElemnt/InputElemnt';
import TextArea from '@/components/TextArea/TextArea';

const ProfileForm = ({state,session,setState}) => {

   const STATE_KEY = "Info"


   const handleTextAreaChange = (id, value) => {
    setState(prevState => ({
      ...prevState,
      [STATE_KEY]: {
        ...prevState[STATE_KEY],
        [id]: value
      }
    }));
  };

    const handleInfoSave = async (Data) => {
       try {
         const response = await fetch('/api/user/profile', { // Change this URL to your actual endpoint
             method: 'POST',
              headers: {
                 'Content-Type': 'application/json',
                    },
                   body : JSON.stringify(Data)  
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
          value={state.Info.about}
          onChange={handleTextAreaChange}
          


      />
      

      {/** User Data Save to db  */}
     <button
        onClick={handleInfoSave}
        >{"עדכון"}
        
        </button>
    </div>
  );
};

export default ProfileForm;
