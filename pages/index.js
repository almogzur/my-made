import Head from 'next/head';
import Header from '../components/app-head/app-head';
import Footer from '../components/footer/app-footer';
import MainSection from '../pages-components/home/main-section'



export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <MainSection/>
      <Footer/>
      
    </>
  );
}
