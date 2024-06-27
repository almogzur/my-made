import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import { CgProfile } from "react-icons/cg";

function ProfileControls() {

  const { data: session } = useSession()
  
  return (
   !session ? 
 <button 
      onClick={() => signIn(undefined,{callbackUrl:"/profile"})}
      className="singIn"
    >הרשמה או התחברות
 </button> 
:
<div 
 className="singOutDiv"
>
   <Link 
     href={"/profile"}
     className="profile-link"
    ><CgProfile size={40} />
      
    <br/>
   </Link>
   <button 
      className="singOut"
     onClick={() => signOut({
        callbackUrl:"/"
     })}
     >התנתק
  </button>
</div>
) 
}

export default ProfileControls;

