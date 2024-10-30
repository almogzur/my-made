import Colors  from "../lib/colors";

function OrdersButton({width,height,border,borderRadius,borderColor}) {


     

    const Style = { 
          width: "150px",  
          height: '4em',
          border: `2px solid ${borderColor?? Colors.c}`,
          borderRadius: "6px",
          color:"#fff"
         }

    return <button  style={Style}  >
            פירסום מודעה 
         </button>
}

export default OrdersButton;