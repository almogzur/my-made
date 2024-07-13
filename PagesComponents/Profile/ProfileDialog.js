import { useEffect, useState, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { color, LazyMotion, m } from "framer-motion";
import Colors from '@/lib/colors';
import useGetUser from '@/lib/hooks/useGetUser';
import MongoSpinner from '@/components/MongoSpinner/MongoSpinner';
import InfoDisplay from '@PagesComponents/Profile/InfoDisplay';
import ProfileForm from 'PagesComponents/Profile/ProfileForm';
import Dialog from "@/components/Dialog/Dialog"
import loadFeatures from "@/lib/features"




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
                      perentOpenModle={perentOpenModle}
                      setPerentOpenModle={setPerentOpenModle}
                />
      :
      <LazyMotion features={loadFeatures}>
      <div
    
      >
      
        <Dialog
            perentOpenModle={perentOpenModle}
            setPerentOpenModle={setPerentOpenModle}
            buttonText={"עדכון פרטים"}
            buttonStyle={{
                   height: "70px", 
                   marginTop: "15px",
                   width: '40%',
                   border: "1px solid",
                   borderRadius: "15px",
                   background: "#fff",
                   fontSize: "20px",
                   color: "#fff",
                   cursor: "pointer",
                   textAlign: "center",
                   color:Colors.b,
                   boxShadow:`3px 3px 3px 3px ${Colors.c}`

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
      </LazyMotion>
    
    
  

    
}

export default ProfileDialog;
