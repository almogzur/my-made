import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useUser from '../../lib/hooks/useUser';
import Colors from '../../lib/colors'

const Header=({inOrder})=>{

  const { data: session, status } = useSession();
  const { user, isLoading, isError } = useUser(session?.user?.email);

return ( inOrder ? <OrderId  session={session}/> : <UserName sessio={session} /> )

}

export default Header


const UserName = ({session})=>{

    const Style = {
      width:"100%",
      height:"40px",
      background:Colors.d,
      display:'flex',
      justifyContent:"center",
      alignItems:"center",
      width:"100%",
      color:Colors.a
   }

   return(
        <div
          style={Style}
          >{!session? null :  " משתמש  :" +  session?.user?.name }
        </div>
   )
}

const OrderId= ({session})=>{
        return <div>
          
        </div>
}