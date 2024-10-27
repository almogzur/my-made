import Colors from "../lib/colors";
import CostumeLink from '../components/costume-link/costume-link'
import Footer from '../components/footer/app-footer';
import { MdCleaningServices } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import ProfileLink from "../components/profile-controls/profile-link";


 

const ProfileLayout = ({ children }) => {

   const divStyle = {
           width:"50px",
           height:"55px" ,
           display:'flex',
           flexDirection:'column',
           justifyContent:'center',
           alignItems:'center',
           alignContent:'center',
           color:Colors.a
   }
  

  return (
    <>
    
  
      {children}

      <Footer  >
          <CostumeLink
            href="/profile/customer"
             divStyle={divStyle}
        
        >
          <FaHome size={40}/>
          </CostumeLink>

          <CostumeLink

            href="/profile/vendor"
            divStyle={divStyle}
            
        >
          <MdCleaningServices size={40} />
          </CostumeLink>
          <ProfileLink/>


      </Footer>

    </>
  )
}

export default ProfileLayout;
