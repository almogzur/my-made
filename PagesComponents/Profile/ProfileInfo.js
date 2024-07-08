import { useEffect, useState, useContext } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { UserContext } from '@Context/Context';
import Colors from '@/lib/colors';
import LoadingSpinner from '@/components/Loader/LoadingSpinner';
import { LazyMotion, m } from "framer-motion";

const loadFeatures = () =>
  import("@/lib/features.js").then(res => res.default);

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
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  //  this function save the satee object
  // in db for lather ref 

  useEffect(() => {
    console.log(state);
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/savestate', {
          method: 'POST',
          body:JSON.stringify(state),
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchProfileData();
    }
  }, [session]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;

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
          buttonText={profileData ? "עדכון פרטים" : "הוסף פרטים"}
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
          {<ProfileForm />}
        </Dialog>
      </m.div>
    </LazyMotion>
  );
};

export default ProfileInfo;
