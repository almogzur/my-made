import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { UserContext } from '@Context/Context';
import Colors from '@/lib/colors';
import LoadingSpinner from '@/components/Loader/LoadingSpinner';
// features.js

import { LazyMotion, m } from "framer-motion"

const loadFeatures = () =>
  import("@/lib/features.js").then(res => res.default)

// Dynamic imports
const Dialog = dynamic(() => import('@/components/Dialog/Dialog'), {
  ssr: false, 
  loading: () => <LoadingSpinner/>
});

const ProfileForm = dynamic(() => import('PagesComponents/Profile/ProfileForm'), {
  ssr: false,
  loading: () => <LoadingSpinner/>
});


const ProfileInfo = () => {
  const { data: session, status, update } = useSession();
  const [state, setState] = useContext(UserContext);

  // db query if user has the info saved 
  // then render Info else Render Form 

  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        animate={{ x: [-400, 0] }}
        transition={{ duration: 1 }}
        whileHover={{}}
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
            boxShadow: "0 4px 2px #404040",
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
