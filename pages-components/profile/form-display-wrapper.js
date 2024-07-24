import { useEffect, useState, useContext } from 'react';
import { useSession } from 'next-auth/react';
import useGetUser from '../../lib/hooks/use-get-user'
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner'
import InfoDisplay from './info-display'
import ProfileForm from './profile-form'


const FormDisplayWrapper = ({
  
}) => {

  const { data: session, status, update } = useSession(); 

  const [showInfo , setShowInfo] = useState(true)

  const [perentOpenModle , setPerentOpenModle]= useState(false)

  const { UserData, dbloading, error } = useGetUser(session?.user?.email);
  
  const [ resolvedUser , setResolvedUser] = useState(false)

  useEffect(()=>{
  // the hook is at loading and without use effect dno know when user is !null 
  // after geting the data set state
      if(UserData){
        setResolvedUser(UserData)
      }
  },[UserData])

  if (dbloading === "loading") {
    return <MongoSpinner />;
  }
  else if( resolvedUser && showInfo ) {
     return <InfoDisplay
          phone={resolvedUser?.state?.Info.phone}           
          setShowInfo={setShowInfo}
          setPerentOpenModle={setPerentOpenModle}
            />
         }
    
  return <ProfileForm 
             dbPhone={resolvedUser?.state?.Info.phone}
        /> 
 
    
       
}

export default FormDisplayWrapper;
