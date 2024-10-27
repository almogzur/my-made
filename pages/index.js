import Head from 'next/head';
import MainSection from '../pages-components/home/main-section'
import LoginButton from '../components/profile-controls/log-in-button';
import ProfileLink from '../components/profile-controls/profile-link';

import { useSession } from 'next-auth/react';


export default function Home() {
  const { data: session , status , } = useSession();

  if(status === "loading"){
    return <h1>Loading....</h1>
  }

  return (
    <>
      <Head>
        <title>MadeIt</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

 
       <MainSection/>
       {session ? <ProfileLink /> : <LoginButton/> }



       {/* Extracting Logic from Profile Controls to Index pages  */}
       {/* <ProfileControls inHomePage={true}/>      */}
      
    </>
  );
}
