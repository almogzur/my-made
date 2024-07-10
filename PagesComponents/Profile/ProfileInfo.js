import { useEffect, useState, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { LazyMotion, m } from "framer-motion";
import Colors from '@/lib/colors';
import useGetUser from '@/lib/hooks/useGetUser';
import MongoSpinner from '@/components/MongoSpinner/MongoSpinner';
import ProfileInfoDisplay from "@PagesComponents/Profile/ProfileInfoDisplay"
import ProfileForm from 'PagesComponents/Profile/ProfileForm';
import Dialog from "@/components/Dialog/Dialog"
import LoadingSpinner from '@/components/SpiningLoader/SpiningLoader';

const loadFeatures = () =>
  import("@/lib/features.js")
      .then(res => res.default)



const ProfileInfo = () => {
  const { data: session, status, update } = useSession(); 
  const { UserData, dbloading, error } = useGetUser(session?.user?.email);
  const [ resolvedUser , setResolvedUser] = useState(false)
  const [showInfo,setShowInfo] = useState(true)

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



  return    resolvedUser && showInfo? <ProfileInfoDisplay
                      age={resolvedUser.state.Info.age}
                      phone={resolvedUser.state.Info.phone}
                      about={resolvedUser.state.Info.about}
                      setShowInfo={setShowInfo}
                />
      :
      <LazyMotion features={loadFeatures}>
      <m.div
        animate={{ x: [-400, 0] }}
        transition={{ duration: 1 }}
        whileHover={{
          scale: 1.1,
          duration: 5,
        }}
      >
      
        <Dialog
                  buttonText={"עדכון פרטים"}
          buttonStyle={{
            height: "100px",
            marginTop: "15px",
            width: '40%',
            border: "none",
            borderRadius: "15px",
            background: Colors.b,
            boxShadow: "4px 4px 2px #FFC436",
            fontSize: "20px",
            color: "#fff",
            cursor: "pointer",
            textAlign: "center",
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
      </m.div>
      </LazyMotion>
    
    
  

    
}

export default ProfileInfo;
