
import Colors from '../../lib/colors'


const Footer = ({children,style,className})  => {

    const defualtStyle={
      position: "fixed",
      bottom: "0",
      width: "100%",
      height: "55px",
      background: Colors.b,
      zIndex:"2"
    }

    return ( 
    <footer
            style={style?style:defualtStyle}
           >
            {children}     
          
    </footer>    
     );
}

export default Footer;