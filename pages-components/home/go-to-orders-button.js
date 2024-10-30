import Colors  from "../../lib/colors";

function OrdersButton({borderColor,textColor}) {


    const Style = { 
          width: "150px",  
          height: '4em',
          border: `2px solid ${Colors.c}`,
          borderRadius: "6px",
          color:"#fff"
         }

    return <button  style={Style}  >
            פירסום מודעה 
         </button>
}

export default OrdersButton;