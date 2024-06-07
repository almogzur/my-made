import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

function ProfileControls() {

  const { data: session } = useSession()
  
  return (
   !session ? 
 <button 
      onClick={() => signIn()}
      className="singIn"
    >הרשמה|התחברות
  </button> 
:
<>
 <button 
   onClick={() => signOut()}
   className="singOut"
   >התנתק
 </button>
 <br/>
  <Link href={"/profile"}>{session?.user?.name}Profile</Link>
</>
) 
}

export default ProfileControls;

