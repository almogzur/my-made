import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useUser from '../../lib/hooks/useUser';
import Colors from '../../lib/colors'

const Header=()=>{

  const { data: session, status } = useSession();
  const { user, isLoading, isError } = useUser(session?.user?.email);
  const router = useRouter();

if( status === "loading "){
  return <h6>loading...</h6>
}



return (
 <div
      style={{
        width:"100%",
        height:"40px",
        background:Colors.b,
        display:'flex',
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        color:Colors.d

      }}
   >
    { !session? null :  " משתמש  :" +  session?.user?.name }
  
 </div>
 )


}

export default Header