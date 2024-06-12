import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";
import NavigationMenu from "@/components/nav/NavWrapper";



function ProfilePage() {

    const { data: session } = useSession()


    useEffect(()=>{},[])


    return (<>
    <NavigationMenu/>
        
    </>  );
}

export default ProfilePage;