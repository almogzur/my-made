import { useSession } from 'next-auth/react';
import { useContext, useState, Fragment } from 'react';
import useUser from '../../lib/hooks/useUser';
import Colors from '../../lib/colors';
import UiDialog from '../../components/dialog/ui-dialog';
import NewOrder from './new-order';
import LoadingSpinner from '../../components/my-spinner/loading-spinner';
import { WindowWidthContaxt } from '../../context';
import { IoMdAddCircle } from "react-icons/io";
import { color } from 'framer-motion';


const UserOrders = () => {
  const { data: session, status, update } = useSession();
  const { user, isLoading, userEroor } = useUser(session?.user?.email);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
   const {xl , lg , md , sm} =  useContext(WindowWidthContaxt)

  const Style = {
    Wrapper: {
     display:"flex",
     flexDirection:"column",
     backgroundColor: "#f9f9f9",
   },
   headline:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    padding:"20px",
    fontSize:"1.5em",
    color:Colors.c,
    fontWeight: 'bold',

   },
    table: {
     borderCollapse: "collapse",
   },

    tableBody: {
     background: "#fff",
   },
    tableRow: {
     borderBottom: "1px solid #ddd",
     height: "50px",
   },
   headlineCell:{
    padding: !md ? "4px" : "16px",
    background:"#fff",
    color:"black",
    borderBottom: "1px solid #ddd",
    height:"60px",
     background:"gray",
  },
    cell: {
     padding: !md ? "4px" : "16px",
     fontSize:  "16px",
     background:"#fff",
     color:"black",
     borderBottom: "1px solid #ddd",
 
 
   },
    expandedRow: {
     backgroundColor: "#f3f3f3",
     color: "#333",
   },
    button: {
     color: "#fff",
     background: "#6c757d",
     padding: "8px 16px",
     fontSize: "14px",
     borderRadius: "4px",
     border: "none",
     cursor: "pointer",
     width:"150px",
     height:"60px",   
     
   },
   newOrderWrap:{
     display:'flex',
     flexDirection:"row",
     justifyContent:'center',
     alignItems:'center',

     margin:"15px",


   }
 }

  if (status === 'loading' || isLoading || isRemoving) {
    return <LoadingSpinner />;
  } else if (userEroor) {
    return <div>Error: {Array.isArray(userEroor) || typeof userEroor === "string" ? userEroor : null}</div>;
  }

  const handleRowClick = (index) => {
    setExpandedOrder(expandedOrder === index ? null : index);
  };

  const handleRemoveOrder = async (orderId) => {
    setIsRemoving(true);
    try {
      const res = await fetch(`/api/customer/remove-order?orderId=${orderId}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        console.log('Order removed:', data.message);
        update();
      } else {
        console.error('Error removing order:', data.message);
      }
    } catch (error) {
      console.error('Failed to remove order:', error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
        <div style={Style.Wrapper}>
              <h1 style={Style.headline}> הזמנות </h1>
            <table style={Style.table}>
            <thead >
              <tr>
                <th style={Style.headlineCell}>הזמנה</th>
                <th style={Style.headlineCell}>טלפון</th>
                <th style={Style.headlineCell}>כתובת</th>
                <th style={Style.headlineCell}>תאריך ושעה </th>
              </tr>
            </thead>

            <tbody style={Style.tableBody}>
              {user?.Orders?.map((order, index) => (
                <Fragment key={order.orderId}>
                  <tr 
                    style={{ ...Style.tableRow, backgroundColor: expandedOrder === index ? "#f7f7f7" : "#fff" }} 
                    onClick={() => handleRowClick(index)}
                  >
                    <td style={Style.cell}>{index + 1}</td>
                    <td style={Style.cell}>{order.orderPhone}</td>
                    <td style={Style.cell}>{order.addres}</td>
                    <td style={Style.cell}>{new Date(order.ResurveDate).toLocaleString('he-IL') || "N/A"}</td>
                  </tr>

                  {expandedOrder === index && (
                    <tr style={Style.expandedRow}>
                      <td colSpan="4" style={{ padding: "16px", fontSize: "15px", lineHeight: "1.6" }}>
                        <strong>Order ID:</strong> {order.orderId}<br />
                        <strong>Status:</strong> {order.orderStatus || "N/A"}<br />
                        <strong>City:</strong> {order.city || "N/A"}<br />
                        <strong>Apartment Size:</strong> {order.ApartmentSize || "N/A"} sq meters<br />
                        <button 
                          onClick={() => handleRemoveOrder(order.orderId)} 
                          disabled={isRemoving}
                          style={{ ...Style.button, background: "#d9534f", marginTop: "10px" }}
                        >
                          {isRemoving ? 'Removing...' : 'Remove'}
                        </button>
                        <UiDialog buttonText="Edit Order">
                          <NewOrder orderId={order.orderId} />
                        </UiDialog>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
            </table>

            <div style={Style.newOrderWrap} > 
               
               <UiDialog 
                 buttonText={"הזמנה חדשה "}
                 buttonStyle={{
                  display:'flex',
                   justifyContent:'space-evenly',
                   alignItems:'center',
                   width:"150px",
                    height:"60px",   
                    backgroundColor: Colors.d,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    

                }}

               Icon={<IoMdAddCircle  size="2em" color={Colors.c} /> 
               } >
                   <NewOrder newOrder={true}/>  
               </UiDialog> 
               
            </div>
        </div>
      

       
    
  );
};

const DemoList = () => {
  return (
    <div style={Style.Wrapper}>
      <h3 style={{ textAlign: "center", color: "#333" }}>Sample Orders</h3>
      <table style={Style.table}>
        <thead style={Style.tableHead}>
          <tr>
            <th style={Style.cell}>#</th>
            <th style={Style.cell}>Address</th>
            <th style={Style.cell}>Phone</th>
            <th style={Style.cell}>Date</th>
          </tr>
        </thead>
        <tbody style={Style.tableBody}>
          <tr style={Style.tableRow}>
            <td style={Style.cell}>1</td>
            <td style={Style.cell}>...</td>
            <td style={Style.cell}>...</td>
            <td style={Style.cell}>...</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserOrders;





()=>{
<td colSpan="4"
>
    <strong style={{color:"red"}}> שם מזמין: {order.userName}</strong> <br/>
    <strong> טלפון : </strong> {order.orderPhone}<br/>
    <strong >תאריך ושעה :</strong> {new Date(order.ResurveDate).toLocaleString('he-IL') || "N/A"}<br/> {/* Reservation date */}
    <strong >עיר :</strong> {order.city || "N/A"}<br/>
    <strong >כתובת :</strong> {order.addres || "N/A"}<br/> {/* Address field */}
    <strong> מספר חדרים  : </strong> {order.ApartmentRoomsNumber || "N/A"}<br/>
    <strong > מספר מקלחות : </strong> {order.NumberOfBaths || "N/A"}<br/>
    <strong> תיאור :</strong> {order.JobDescription || "N/A"}<br/>
    <strong >סטטוס הזמנה :</strong> {order.orderStatus || "N/A"}<br/> {/* Order status */}
    <strong >מזהה הזמנה :</strong> {order.orderId.slice(0,20) + " ... " || "N/A"}<br/>
    <strong > גודל הדירה במטרים:</strong> { order.ApartmentSize || "N/A"}<br/>
    <strong >נוצרה ב :</strong> {new Date(order.createdAt).toLocaleString('he-IL') || "N/A"}<br/>
    {order.updateAt ? <strong  >"עודכנה ב ": {new Date(order.updateAt).toLocaleString('he-IL')}</strong>  : null}

   <strong style={{color:"red"}} > מחיר לשעה : {order.orderPrice || "N/A"}</strong> 

   <div style={{display:"flex" , background:`${Colors.d}` , display:"flex" , justifyContent:"space-around"}}>

  { /**n Remove Order  */}
  <button 
    onClick={() => handleRemoveOrder(order.orderId)} 
    disabled={isRemoving}
    style={{...Style.button,background:"#a90b0b"}}
  >
    <strong>{isRemoving ? 'מוחק...' : 'מחק '}</strong>
  </button>


    {/** Edit Order dialog  */}
  <UiDialog
     buttonText={"ערוך  "}
     CloseDialogButtonStyle={{...Style.button , border:"solid black 0.5px" ,borderRadius:"5px", background:`${Colors.c}`  }}
  >
    <NewOrder orderId={order.orderId}
 
    />
  </UiDialog>

  </div>     

</td>
}


