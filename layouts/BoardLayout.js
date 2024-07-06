  import dynamic from 'next/dynamic';
  import { useSession } from 'next-auth/react'
  import {useEffect,useState} from 'react'
  import { useRouter } from 'next/router'
  import LoadingSpinner from '@/components/Loader/LoadingSpinner';
  import ErrorBoundary from '@/components/ErrorBoundary';

const Footer = dynamic(() => import('components/Footer/Footer'), {
    loading: () => <div>Loading Footer...</div>
  });
  
const CostumeLink = dynamic(() => import('@/components/CostumeLink/CostumeLink'), {
    loading: () => <div>Loading Link...</div>
  });
  const Header = dynamic(() => import('@/components/header/Header'), {
    loading: () => <div>Loading Link...</div>
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