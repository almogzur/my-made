  import dynamic from 'next/dynamic';
  import { useSession } from 'next-auth/react'
  import {useEffect,useState} from 'react'
  import { useRouter } from 'next/router'
  import Footer from '@/components/footer/Footer';
  import Header from '@/components/header/Header';
  import LoadingSpinner from '@/components/spining-loader/SpiningLoader';
  



  
  const BoarfLayout =({children})=>{
  
    const { data: session ,status ,update} = useSession()

      if (status === 'loading') {
       return <LoadingSpinner/>
  }
  
  return (<>
          <Header/>
          {children}

        <Footer/>
        </>
  ) 
  }
  
  export default BoarfLayout