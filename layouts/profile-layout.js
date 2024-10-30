import Colors from "../lib/colors";
import CostumeLink from '../components/costume-link/costume-link'
import Footer from '../components/footer/app-footer';
import { MdCleaningServices } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import ProfileLink from "../components/profile-controls/profile-link";
import HomePageNavigation from "../pages-components/home/home-navigation";

 

const ProfileLayout = ({ children }) => {


  return (
    <>
    <HomePageNavigation/>
  
      {children}

      <Footer>

      </Footer>

    </>
  )
}

export default ProfileLayout;
