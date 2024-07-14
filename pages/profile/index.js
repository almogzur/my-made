/// ProfilePage


import { StateContext } from '@Context/context';
import { useEffect,useContext } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic'; 
import MongoSpinner from '@/components/mongo-Spinner/MongoSpinner';
import LoadingSpinner from '@/components/spining-loader/SpiningLoader';
import ProfileLayout from '@layouts/ProfileLayout';
import ProfileHeader from 'pages-components/profile/ProfileHeder';
import ProfileDialog from 'pages-components/profile/ProfileDialog';
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
