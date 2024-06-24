import FooterRwapper from "@/components/Footer/FooterRwapper";
import SideBar from "@/components/Sidebar/SideBarWrapper";
import Link from "next/link";

function BoardPage() {
    return (  
        <>
        <SideBar
            sidebBarClassName={"bord-side-bar"}
        />
 
            <FooterRwapper/>

        </>
    );
}

export default BoardPage;