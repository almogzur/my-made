import Head from 'next/head';
import Header from '../components/app-head/app-head';
import MainSection from '../pages-components/home/main-section'
import ProfileControls from '../components/profile-sing-in-out/profile-controls';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();


  return (
    <>
      <Head>
        <title>MadeIt</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

 
       <MainSection/>
       <ProfileControls inHomePage={true}/>     
      
    </>
  );
}
