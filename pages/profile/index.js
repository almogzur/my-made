/// ProfilePage

import { useEffect} from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Head from 'next/head';
import ProfileLayout from '../../layouts/profile-layout'

import MongoSpinner from '../../components/mongo-spinner/mongo-spinner'
import ProfileHeader from '../../pages-components/profile/profile-heder'
import FormDisplayWrapper from '../../pages-components/profile/profile-form-wrapper'




const ProfilePage = () => {

  const router = useRouter();
  const { data: session ,status } = useSession()

  // NO Session navigation redirect

  useEffect(() => {
   if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

   if  (status === 'loading' ) {
    return <div>Loading...</div> ;
  
  }
  return (
    <>

    <Head>
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <title>{session?.user?.name}</title>  

    </Head>

     <ProfileLayout>
        <ProfileHeader />
        <FormDisplayWrapper  />
     </ProfileLayout>
 
      </>

  );

}



export default ProfilePage;
