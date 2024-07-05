import Head from 'next/head'
import Image from 'next/image'
import FooterRwapper from "@/components/Footer/Footer"
import Main from 'pages/Main'
import Header from '@/components/header/AppHeader'
import Colors from '@/lib/colors'

export default function Home() {

  return (
    
  <>
  <Header/>
    <FooterRwapper style={{
          position: "fixed",
          bottom: "0",
          width:"100%",
          height:"55px",
           background:Colors.a,
          color:"white",
          display:"flex",
    }}/>
    <Main/>

  </>
    
  )
}
