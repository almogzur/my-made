import Colors from '../../lib/colors'
import OrdersButton from '../../components/go-to-orders-button';
import { color } from 'framer-motion';

function QuickcSingIn() {
    const Style = { 
        Wrapper:{
          width:"100%",
          height:"13em",
          background:Colors.c,
          color:Colors.d,  
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-around',
          alignItems:'center',
          
          
        },
        Text:{
          fontSize:"2em",
          color:"#fff",
          textAlign:"center"
        }
      }
  
  return (
    <div style={Style.Wrapper} >
        <h1 style={Style.Text} >צריך עזרה פרסם עכשיו ?!  </h1>
        <OrdersButton borderColor={"#fff"} />
    </div>
    )
}

export default QuickcSingIn;