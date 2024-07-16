// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
// Nav Wrapper

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHome, faClipboard } from "@fortawesome/free-solid-svg-icons";
import Colors from '../../lib/colors'
import CostumeLink from '../costume-link/costume-link'
import ProfileControls from '../next-auth/profile-controls'


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
         <CostumeLink
            href={"/"}
            motionWrapperStyle={{
              width:"70px",
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center',
              alignContent:'center',
            }}
            linkStyle={{}}
            divStyle={{}}
           
           >
            <FontAwesomeIcon icon={faHome} color={Colors.d} size={"2x"} />
         </CostumeLink>

         <CostumeLink
              href={"/board"}
              motionWrapperStyle={{
                height:'inherit',
                width:"70px",
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                alignContent:'center',
              }}
              linkStyle={{ }}
              divStyle={{ }}
     
        
          >
           <FontAwesomeIcon size="2x" color={Colors.d} icon={faClipboard}/>
        </CostumeLink>
            {children} 
           
      
        
          <ProfileControls/>
    </footer>    
     );
}

export default Footer;