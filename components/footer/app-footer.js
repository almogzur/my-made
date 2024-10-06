
import Colors from '../../lib/colors'


const Footer = ({children,style})  => {

    const defualtStyle={
      position: "fixed",
      bottom: "0",
      width: "100%",
      height: "55px",
      background: Colors.b,
      zIndex:"2",
      display:'flex',
      flexDirection:'row'|'column',
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
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