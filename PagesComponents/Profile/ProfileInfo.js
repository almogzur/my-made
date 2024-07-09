import { useEffect, useState, useContext } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { UserContext } from '@Context/Context';
import { LazyMotion, m } from "framer-motion";
import Colors from '@/lib/colors';
import { getServerSession } from "next-auth/next"
import useGetUser from '@/lib/hooks/useGetUser';


const LoadingSpinner = dynamic(() => import("@/components/SpiningLoader/SpiningLoader"), {
  ssr: false,
});
const loadFeatures = () =>
  import("@/lib/features.js")
.then(res => res.default);

const Dialog = dynamic(() => import('@/components/Dialog/Dialog'), {
  ssr: false, 
  loading: () => <LoadingSpinner/>
});

const ProfileForm = dynamic(() => import('PagesComponents/Profile/ProfileForm'), {
  ssr: false,
  loading: () => <LoadingSpinner/>
});



const ProfileInfo =  () => {
  const { data: session, status, update } = useSession();
const {userData,loading,error} = useGetUser(session.user.email)
  
  
useEffect(()=>{
  console.log(userData);
})


  
  return (


    <LazyMotion features={loadFeatures}>
      <m.div
        animate={{ x: [-400, 0] }}
        transition={{ duration: 1 }}
        whileHover={{
          scale: 1.1,
          duration: 5
        }}
      >
        <Dialog
         buttonText={  "עדכון פרטים"}
         buttonStyle={{
            height: "100px",
            marginTop: "15px",
            width: '40%',
            border: "none",
            borderRadius: "15px",
            background: Colors.b,
            boxShadow: "4px 4px 2px #FFC436",
            fontSize: "20px"
          }}
         wrapperStyle={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <ProfileForm />
        </Dialog>
      </m.div>
    </LazyMotion>
  );
};

export default ProfileInfo;

