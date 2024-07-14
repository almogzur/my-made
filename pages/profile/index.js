/// ProfilePage


import { StateContext } from '@Context/Context';
import { useEffect,useContext } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic'; 
import MongoSpinner from '@/components/MongoSpinner/MongoSpinner';
import LoadingSpinner from '@/components/SpiningLoader/SpiningLoader';
import ProfileLayout from '@layouts/ProfileLayout';
import ProfileHeader from 'PagesComponents/Profile/ProfileHeder';
import ProfileDialog from '@PagesComponents/Profile/ProfileDialog';
import useSaveUserState from '@/lib/hooks/useSaveUserState';
import Head from 'next/head';



const ProfilePage = () => {


  const router = useRouter();
  const { data: session ,status ,update} = useSession()
  const [state, setState] = useContext(StateContext);

  // save satae to db on profile load 
  // on first singin only the seesion is saved to db 
  // this config the Profile to carry state in db and app 
  const { _ResponceMoActualUse , dbsaving, profileError } = useSaveUserState(state, session);


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);



  if (status === 'loading') {
    return <LoadingSpinner/>;
  }
  else if(dbsaving){
    return <MongoSpinner/>
  }
  else if(profileError){
    router.push("/error")
  }
  else{

  return (
    <ProfileLayout>
      <ProfileHeader />
      <ProfileDialog/>
    </ProfileLayout>
    
  );
}
};

export default ProfilePage;
