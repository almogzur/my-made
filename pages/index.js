import Head from 'next/head';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import Main from 'pages-components/home/Main';



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
