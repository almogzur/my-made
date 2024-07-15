import Head from 'next/head';
import Header from '@components/header/header';
import Footer from '@components/footer/footer';
import Main from '@pages-components/home/main-section';



export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Footer/>
      <Main />
    </>
  );
}
