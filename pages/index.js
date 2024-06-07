import Head from 'next/head'
import Image from 'next/image'
import NavigationMenu from "components/nav/NavWrapper"
import Main from '@/components/homeppage/Main'

export default function Home() {
  return (
    
  <>
    <NavigationMenu/>
    <Main/>
  </>
    
  )
}
