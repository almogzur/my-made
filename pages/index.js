import Head from 'next/head';
import Header from '../components/app-head/app-head';
import Footer from '../components/footer/app-footer';
import MainSection from '../pages-components/home/main-section'
import ProfileControls from '../components/next-auth/profile-controls';



export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <MainSection/>

      <div style={{
            marginTop:"20px",
            width:"100%",
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            alignContent:'center',
            position:"absolute",
            bottom:"20%",
        }
      }>
      <ProfileControls
        LogInStyleProps = {{}}
        LogOutStyleProps ={{}}
        ProfileLinkStyleProps = {{}}

      />     
      </div>
    </>
  );
}
