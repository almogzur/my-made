import { useEffect, useState, useContext } from 'react';
import { useSession } from 'next-auth/react';
import Colors from '../../lib/colors';
import useGetUser from '../../lib/hooks/use-get-user'
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner'
import InfoDisplay from './display'
import ProfileForm from './profile-form'
import Dialog from '../../components/dialog/ui-dialog'


const ProfileDialog = ({
  
}) => {

  const { data: session, status, update } = useSession(); 

  const [showInfo,setShowInfo] = useState(true)

  const [perentOpenModle , setPerentOpenModle]= useState(false)

  const { UserData, dbloading, error } = useGetUser(session?.user?.email);
  
  const [ resolvedUser , setResolvedUser] = useState(false)

  useEffect(()=>{
  // the hook is at loading and without use effect dno know when user is !null 
  // after geting the data set state
      if(UserData!==null){
        setResolvedUser(UserData)
      }
  },[UserData])


  if (dbloading === "loading") {
    return <MongoSpinner />;
  }



  return    resolvedUser && showInfo? <InfoDisplay
                      age={resolvedUser?.state?.Info.age}
                      phone={resolvedUser?.state?.Info.phone}
                      about={resolvedUser?.state?.Info.about}
                      setShowInfo={setShowInfo}
                      setPerentOpenModle={setPerentOpenModle}
                />
      :

      <div>
      
        <Dialog
            perentOpenModle={perentOpenModle}
            setPerentOpenModle={setPerentOpenModle}
            buttonText={"עדכון פרטים"}
            buttonStyle={{
                   height: "50px", 
                   marginTop: "15px",
                   width: '40%',
                   border: "1px solid",
                   borderRadius: "3px",
                   background: "#fff",
                   fontSize: "20px",
                   color: "#fff",
                   cursor: "pointer",
                   textAlign: "center",
                   color:Colors.b,
                   boxShadow:`0px 2px 4px ${Colors.a}`

          }}
          wrapperStyle={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
        
          <ProfileForm 
              dbAbout={resolvedUser?.state?.Info.about}
              dbAge={resolvedUser?.state?.Info.age}
              dbPhone={resolvedUser?.state?.Info.phone}
          
                />
        
        </Dialog>
      </div>

    
    
  

    
}

export default ProfileDialog;
