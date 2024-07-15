  import { useSession } from 'next-auth/react'  
 import Footer from '../components/footer/footer'
  import Header from '../components/header/header';
  import LoadingSpinner from '../components/spining-loader/spining-loader';
  



  
  const BoarfLayout =({children})=>{
  
    const { data: session ,status } = useSession()

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