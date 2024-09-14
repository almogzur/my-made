import { useEffect, useState, useContext } from 'react';
import { useSession } from 'next-auth/react';
import InfoDisplay from './profile-info-display'
import ProfileForm from './profile-form'
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner';
import useUser from '../../lib/hooks/useUser';


const FormDisplayWrapper = () => {

  const { data: session , status } = useSession()
  const { user , isLoading , isError } = useUser(session?.user?.email)
  const [ editInfo , setEditInfo ] = useState(false)

  
  if (isError){return <p>error</p>}

  else if (status ==="loading" || isLoading ){
    return <MongoSpinner/>
  }

  else if (!user || editInfo)  {
      return <ProfileForm setShowInfo={setEditInfo} /> 
  }
  
     const { Info } = user
   
      return <InfoDisplay
                 phone={Info?.phone}       
                 setEditInfo={setEditInfo}    
                  />
          
        }
     
  


export default FormDisplayWrapper;
