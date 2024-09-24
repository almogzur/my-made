
import CostumeLink from '../../components/costume-link/costume-link'
import Colors from '../../lib/colors'
import ProfileControls from '../profile-sing-in-out/profile-controls'


const Footer = ({children,style,className})  => {

    const defualtStyle={
      position: "fixed",
      bottom: "0",
      width: "100%",
      height: "55px",
      background: Colors.b,
      display: "flex",

      zIndex:"2"
    }

    return ( 
    <footer
            style={style?style:defualtStyle}
            className={className?className:null} 
           >
            {children}     
          <ProfileControls/>
          
    </footer>    
     );
}

export default Footer;