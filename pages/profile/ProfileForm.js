import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import { UserContext } from '@Context/Context';
import InputElemnt from '@/components/InputElemnt/InputElemnt';
import TextArea from '@/components/TextArea/TextArea';

const ProfileForm = () => {
  const { data: session, status } = useSession();
  const [User, setUser] = useContext(UserContext);
  
  // Initialize local state with User context
  const [localState, setLocalState] = useState({
    age: User.age || '',
    phone: User.phone || '',
    about: User.about || ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setLocalState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  // Handle button click to update context
  const handleUpdate = () => {
    setUser(localState);
  };

  if (status === 'loading') {
    return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;
  }

  return (
    <div className='profile-info-section'>
      <h1>עדכון פרטי משתמש</h1>
      <div className='profile-info-split'>
        <InputElemnt
          type="text"
          text="גיל"
          id="age"
          labelClassName=""
          required
          inputClassName=""
          value={localState.age}
          onChange={handleChange}
        />
        <InputElemnt
          type="text"
          text="טלפון"
          id="phone"
          labelClassName=""
          required
          inputClassName=""
          value={localState.phone}
          onChange={handleChange}
        />
      </div>
      <TextArea
        id="about"
        value={localState.about}
        onChange={handleChange}
      />
      
     <button
        
        >{"עדכון"}
        
        </button>
    </div>
  );
};

export default ProfileForm;
