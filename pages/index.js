import Head from 'next/head';
import { useSession } from 'next-auth/react'
import MainSection from '../pages-components/home/main-section'
import HomePageNavigation from '../pages-components/navigation'
import HowThisWorks from '../pages-components/home/how-this-works';
import HomePageReview from '../pages-components/home/review';
import QuickcSingIn from '../pages-components/home/ quick-sing-in';
import { Container } from '@chakra-ui/react';

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
      
     <HomePageNavigation/>
     <MainSection/>
     <QuickcSingIn/>
     <HowThisWorks/>
     </>
  );
}



