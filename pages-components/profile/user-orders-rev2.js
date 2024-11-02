import { useSession } from 'next-auth/react';
import { useContext, useState, Fragment } from 'react';
import useUser from '../../lib/hooks/useUser';
import Colors from '../../lib/colors';
import UiDialog from '../../components/dialog/ui-dialog';
import NewOrder from './new-order';
import LoadingSpinner from '../../components/my-spinner/loading-spinner';
import { WindowWidthContaxt } from '../../context';
import { IoMdAddCircle } from "react-icons/io";
import {  LazyMotion, motion, AnimatePresence } from 'framer-motion';
import f from '../../lib/features'




 const UserOrders = () => {
   const { data: session, status, update } = useSession();
   const { user, isLoading, userEroor } = useUser(session?.user?.email);
   const [expandedOrder, setExpandedOrder] = useState(null);
   const [isRemoving, setIsRemoving] = useState(false);
   const { xl, lg, md, sm } = useContext(WindowWidthContaxt);
 
   const Style = {
    Wrapper: {
     display:"flex",
     flexDirection:"column",
     backgroundColor: "#f9f9f9",
     fontWeight: 'bold',

     
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
    tableRow: {
     borderBottom: "1px solid #ddd",
     height: "50px",
   },
   headlineCell:{
    padding: !md ? "4px" : "16px",
    background:"#fff",
    borderBottom: "1px solid #ddd",
    height:"60px",
     background:"gray",
  },
    cell: {
     padding: !md ? "4px" : "16px",
     fontSize: !md ?  "14px" : "18px",
     background:"#fff",
     color:"black",
     borderBottom: "1px solid #ddd",
     fontWeight:!md ? "bold" : null
 
 
   },
    expandedRow: {
    background:"lightgray",
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
     margin:"20px" ,
     fontWeight:"bold",
     
     
   },
   newOrderWrap:{
     display:'flex',
     flexDirection:"row",
     justifyContent:'center',
     alignItems:'center',
     margin:"15px",


   },
   expendedOrderBtnWrap:{
    display:'flex',
    flexDirection:'row',
    flexWrap:"wrap",
    justifyContent:"space-evenly",
    maxWidth:"600px",
    borderTop:"dotted",
   },
   orderDetails:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    fontSize:"15px",
    
   }, 
   detail:{
    fontSize:!md? "15px ": "20px" ,

   }
 }
 
   if (status === 'loading' || isLoading || isRemoving) {
     return <LoadingSpinner />;
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
         <thead>
           <tr>
             <th style={Style.headlineCell}>הזמנה</th>
             <th style={Style.headlineCell}>טלפון</th>
             <th style={Style.headlineCell}>כתובת</th>
             <th style={Style.headlineCell}>תאריך ושעה </th>
           </tr>
         </thead>
         <tbody>
           {user?.Orders?.map((order, index) => (
             <Fragment key={order.orderId}>
               <tr onClick={() => handleRowClick(index)}>
                 <td style={Style.cell}>{index + 1}</td>
                 <td style={Style.cell}>{order.orderPhone}</td>
                 <td style={Style.cell}>{order.addres}</td>
                 <td style={Style.cell}>{new Date(order.ResurveDate).toLocaleString('he-IL') || "N/A"}</td>
               </tr>
                <AnimatePresence>
                     {expandedOrder === index && (
          
                    <motion.td 
                     colSpan="4" style={{background:"lightgray"}}
                     >
                  
                         <motion.div 
                           style={Style.orderDetails}
                           initial={{ opacity: 0, height:0 ,x:500 }}
                           animate={{ opacity: 1,  type:"ease", height:"auto" , background:"lightgray" , x:0,  }}
                           exit={{ opacity:0  , x:600  ,height:0,   type:"spring" , background:"#808080",  }}
                           transition={{ duration: 2 , type:"spring" , type:"spring" ,}}
                         
                  
                         >

                         <strong style={{ ...Style.detail ,color:"#d9534f", fontSize:"20px" , marginBottom:"10px" , borderBottom:"dotted" , borderColor:"black"}}> מזמין: {order.userName}</strong> 
                         <strong style={Style.detail}> טלפון : {order.orderPhone} </strong> 
                         <strong style={Style.detail} >תאריך ושעה :  {new Date(order.ResurveDate).toLocaleString('he-IL') || "N/A"}  </strong>
                         <strong style={Style.detail}   >עיר : {order.city || "N/A"}</strong> 
                         <strong style={Style.detail} >כתובת : {order.addres || "N/A"}  </strong> 
                         <strong style={Style.detail}> מספר חדרים  :  {order.ApartmentRoomsNumber || "N/A"} </strong>
                         <strong style={Style.detail} > מספר מקלחות :   {order.NumberOfBaths || "N/A"}</strong>
                         <strong style={Style.detail} > תיאור : {order.JobDescription || "N/A"} </strong> 
                         <strong style={Style.detail}  >סטטוס הזמנה :{order.orderStatus || "N/A"}</strong> 
                         <strong style={Style.detail} >מזהה הזמנה : {order.orderId.slice(0,17) + " ... " || "N/A"} </strong> 
                         <strong style={Style.detail} > גודל הדירה במטרים : { order.ApartmentSize || "N/A"} </strong> 
                         <strong style={Style.detail} >נוצרה ב :{new Date(order.createdAt).toLocaleString('he-IL') || "N/A"}</strong> 
                         {order.updateAt ? 
                         <strong style={Style.detail} >"עודכנה ב ": {new Date(order.updateAt).toLocaleString('he-IL')}</strong>  : null
                        }
                         <strong style={{...Style.detail ,color:"#d9534f"}} > מחיר לשעה : {order.orderPrice || "N/A"}</strong> 
                    
                          <div style={Style.expendedOrderBtnWrap}>

                         <button 
                           onClick={() => handleRemoveOrder(order.orderId)} 
                           disabled={isRemoving}
                           style={{ ...Style.button, background: "#d9534f" }}
                         >
                           {isRemoving ? 'מוחק...' : 'מחק'}
                         </button>
                         <UiDialog buttonStyle={Style.button} buttonText="ערוך הזמנה">
                           <NewOrder orderId={order.orderId} />
                         </UiDialog>

                        </div>
                        
                        </motion.div>
                   </motion.td>
              
                 )}
                 </AnimatePresence>
                 </Fragment>
           ))}
         </tbody>
       </table>
 
       <div style={Style.newOrderWrap}> 
         <UiDialog 
           buttonText={"הזמנה חדשה "}
           buttonStyle={{
             display: 'flex',
             justifyContent: 'space-evenly',
             alignItems: 'center',
             width: "150px",
             height: "60px",   
             backgroundColor: Colors.d,
             color: '#fff',
             border: 'none',
             borderRadius: '5px',
             cursor: 'pointer',
             fontSize: '1rem',
             fontWeight: 'bold',
           }}
           Icon={<IoMdAddCircle size="2em" color={Colors.c} />}
         >
           <NewOrder newOrder={true} />  
         </UiDialog> 
       </div>
     </div>
   );
 };
 
 export default UserOrders;
 
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


