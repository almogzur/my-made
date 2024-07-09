/// ProfilePage


import { UserContext } from '@Context/Context';
import { useEffect,useContext } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

const MongoSpinner = dynamic(() => import("@/components/MongoSpinner/MongoSpinner"), {
  ssr: false,
});
const LoadingSpinner = dynamic(() => import("@/components/SpiningLoader/SpiningLoader"), {
  ssr: false,
});
const ProfileLayout = dynamic(() => import('@layouts/ProfileLayout'), {
  loading: () => <MongoSpinner />,
  ssr: true,
});
const ProfileHeader = dynamic(() => import('PagesComponents/Profile/ProfileHeder'), {
  loading: () => <MongoSpinner />,
  ssr: true,
});
const ProfileInfo = dynamic(() => import('@PagesComponents/Profile/ProfileInfo'), {
  loading: () => <MongoSpinner />,
  ssr: true,
});

import useSaveUserState from '@/lib/hooks/useSaveUserState';



const ProfilePage = ({  }) => {
  const router = useRouter();
  const { data: session ,status ,update} = useSession()
  const [state, setState] = useContext(UserContext);

  const { profileData, saving, profileError } = useSaveUserState(state, session);


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === 'loading') {
    return <LoadingSpinner/>;
  }
  else if (profileError){
    return <h1>Eroor Saving User Data {profileError}</h1>
  }
  else if(saving){
    return <MongoSpinner/>
  }

  return (
    <ProfileLayout>
      <ProfileHeader />
      <ProfileInfo 
        age={""}
        about={""}
        phone={0}
      />
    </ProfileLayout>
  );
};

export default ProfilePage;
