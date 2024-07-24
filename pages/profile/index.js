/// ProfilePage

import { StateContext } from './../../context';
import { useEffect,useContext } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner'
import ProfileLayout from '../../layouts/profile-layout'
import ProfileHeader from '../../pages-components/profile/profile-heder'
import useSaveUserState from '../../lib/hooks/use-save-user-state';
import Head from 'next/head';
import FormDisplayWrapper from '../../pages-components/profile/form-display-wrapper'
import VenderActiveOrEdit from '../../pages-components/profile/profile-vendor-active-edit';



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



  if (status === 'loading' || dbsaving) {
    return <MongoSpinner/>;
  }
  else if(profileError){
    router.push("/error")
  }
  else{

  return (
    <>

    <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Your Page Title</title>
        
    </Head>
 
    <ProfileLayout>
        <ProfileHeader />
        <FormDisplayWrapper />
        { state.Vendor.isVendor ?
          <VenderActiveOrEdit/>
          :
          null
        }
        </ProfileLayout>
      
      </>

  );
}
};

export default ProfilePage;
