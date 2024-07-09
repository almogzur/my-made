  import dynamic from 'next/dynamic';
  import { useSession } from 'next-auth/react'
  import {useEffect,useState} from 'react'
  import { useRouter } from 'next/router'
  import ErrorBoundary from '@/components/ErrorBoundary';

const Footer = dynamic(() => import('components/Footer/Footer'), {
  });
  
const CostumeLink = dynamic(() => import('@/components/CostumeLink/CostumeLink'), {
  });
  const Header = dynamic(() => import('@/components/header/Header'), {
  });

const LoadingSpinner = dynamic(() => import("@/components/SpiningLoader/SpiningLoader"), {
  ssr: false,
});



  
  const BoarfLayout =({children})=>{
  
    const { data: session ,status ,update} = useSession()

      if (status === 'loading') {
       return <LoadingSpinner/>
  }
  
  return (
    <ErrorBoundary >
          <Header/>
          {children}

        <Footer/>
    </ErrorBoundary>
  ) 
  }
  
  export default BoarfLayout