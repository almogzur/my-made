import { useEffect, useState, useContext } from 'react';
import { useSession } from 'next-auth/react';
import InfoDisplay from './profile-info-display'
import ProfileForm from './profile-form'
import useUser from '../../lib/hooks/useUser';


const FormDisplayWrapper = () => {

  const { data: session , status } = useSession()
  const { user , isLoading , isError } = useUser(session?.user?.email)
  const [ editInfo , setEditInfo ] = useState(false)

  
  if (isError){
    return <p>error</p>
  }
  else if (!user?.Info || editInfo) 
  {
    return <ProfileForm 
             setShowInfo={setEditInfo} 
            /> 
  }
     return <InfoDisplay
                 phone={user?.Info?.phone}       
                 setEditInfo={setEditInfo}    
             />
          
        }
     
  


export default FormDisplayWrapper;
