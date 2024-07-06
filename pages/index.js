import Head from 'next/head';
import dynamic from 'next/dynamic';
import Colors from '@/lib/colors';
import LoadingSpinner from '@/components/Loader/LoadingSpinner';

// Dynamic imports
const Header = dynamic(() => import('@/components/header/AppHeader'), {
  ssr: false,
  loading: () => <div>Loading Header...</div>,
});

const FooterWrapper = dynamic(() => import('@/components/Footer/Footer'), {

  loading: () => <div>footer loading</div>,
});

const Main = dynamic(() => import('pages/Main'), {
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
      <FooterWrapper 
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          height: "55px",
          background: Colors.a,
          color: "white",
          display: "flex",
        }}
      />
      <Main />
    </>
  );
}
