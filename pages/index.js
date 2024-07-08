import Head from 'next/head';
import dynamic from 'next/dynamic';
import Colors from '@/lib/colors';
import LoadingSpinner from '@/components/Loader/LoadingSpinner';

// Dynamic imports
const Header = dynamic(() => import('@/components/header/Header'), {
  ssr: false,
  loading: () => <div>Loading Header...</div>,
});

const Footer = dynamic(() => import('@/components/Footer/Footer'), {

  loading: () => <div>footer loading</div>,
});

const Main = dynamic(() => import('@PagesComponents/Home/Main'), {
  ssr: false,
  loading: () => <div>Loading Main...</div>,
});

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
