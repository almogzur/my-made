import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

function ProfileControls() {

  const { data: session } = useSession()
  
  return (
   !session ? 
 <button 
      onClick={() => signIn(undefined,{callbackUrl:"/profile"})}
      className="singIn"
    >הרשמה|התחברות
  </button> 
:
<div
 className="singOutDiv"
>
 <button 
 className="singOut"
   onClick={() => signOut()}
   >התנתק
 </button>
 <Link 
 href={"/profile"}
   className="profile-link"
 >{"פרופיל אישי "}<br/>
  
  </Link>


</div>
) 
}

export default ProfileControls;

