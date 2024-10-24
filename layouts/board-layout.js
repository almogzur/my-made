import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import AppHead from '../components/app-head/app-head'
import Footer from '../components/footer/app-footer'
import Colors from '../lib/colors'


const Style = {
    Fotter: { 
      marginTop: "3px",
      borderRadius: "5px",
      height: "50px",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      background: Colors.d,
      width: "70px",
    },
    Profilelink: { 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: "50px",
      width: "75px",
      borderRadius: "7px",
      background: Colors.b
    }
  };

const BoardLayout=({children})=>{


  const { data: session ,status ,update} = useSession()



return (
    <>
     <AppHead />
     {children}

     <Footer>
        <div style={Style.Fotter}>
          <Link style={Style.Profilelink} href={"/profile"} shallow={true}>
            <Image
              src={session?.user?.image}
              height={40}
              width={40}
              style={{ borderRadius: "15px" }}
              alt="User Profile Link"
              fetchPriority="auto"
            />
          </Link>
        </div>
      </Footer>
    </>
) 
}

export default BoardLayout