import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";
import FooterRwapper from "@/components/footer/FooterRwapper";



function ProfilePage() {

    const { data: session } = useSession()


    useEffect(()=>{},[])


    return (<>
    <FooterRwapper/>
        
    </>  );
}

export default ProfilePage;