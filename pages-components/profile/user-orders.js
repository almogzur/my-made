import { useSession } from 'next-auth/react';
import { useContext, useState, Fragment } from 'react';
import useUser from '../../lib/hooks/useUser';
import Colors from '../../lib/colors';
import UiDialog from '../../components/dialog/ui-dialog';
import NewOrder from './new-order';
import LoadingSpinner from '../../components/my-spinner/loading-spinner';
import { WindowWidthContext } from '../../context';
import { IoMdAddCircle } from "react-icons/io";
import {   motion ,AnimatePresence } from 'framer-motion';
import { DataListItem, DataListRoot as DataList } from "../../components/ui/data-list"
import { Container } from '@chakra-ui/react';

const UserOrders = () => {
  const { data: session, status, update } = useSession();
  const { user, isLoading, userError } = useUser(session?.user?.email);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const { xl, lg, md, sm } = useContext(WindowWidthContext);

  const Style = {
    wrapper: {
        backgroundColor: "#fff",
     },
    headline: {
      textAlign: 'center',
      fontSize: "2em",
      color: Colors.c,
      fontWeight: 'bold',
      marginBottom: "20px",
    },

    ordersMainRow:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      background:"gray",
      height:"60px",
        
    },

    RowContainer: {
      display: "flex",
      flexDirection: "column",
      borderBottom: "1px solid #ddd",
      padding: "5px",
      background: "#fff",
      borderRadius: "5px",
    },
    Row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "60px",
      cursor: "pointer",
      background: "#f9f9f9",

    },
    orderDetail: {
      fontSize: !md ? "14px" : "16px",
      color: "#333",
      width:"25%"
      
    },
    expandedDetails: {
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      background: "lightgray",
      width:"100%",
    },

    button: {
      color: "#fff",
      background: "#6c757d",
      height:"50px",
      width:"120px",
      fontSize: "14px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      margin: "20px",
    },
    BtnsWrap:{
      display:'flex',
      flexDirection:'row',
      flexWrap:"wrap",
      justifyContent:"space-evenly"
      
      
    },
    newOrderWrap: {
      display: 'flex',
      justifyContent: 'center',

    },
  };

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
    <Container style={Style.wrapper}>
      <h1 style={Style.headline}>הזמנות</h1>
      <div style={Style.ordersMainRow} >
            <span style={{...Style.orderDetail,width:"7%"}}> #</span>
            <span style={Style.orderDetail}>טלפון</span>
            <span style={Style.orderDetail}>כתובת</span>
            <span style={Style.orderDetail}>תאריך</span>
          </div>

      {user?.Orders?.map((order, index) => {
        const orderDetails = [
            { title: "מזמין", value: order.name },
            { title: "טלפון", value: order.orderPhone },
            { title: "תאריך ושעה", value: order.ResurveDate ? new Date(order.ResurveDate).toLocaleString('he-IL').slice(0,10)  : "N/A" },
            { title: "עיר", value: order.city || "N/A" },
            { title: "כתובת", value: order.addres || "N/A" },
            { title: "מספר חדרים", value: order.ApartmentRoomsNumber || "N/A" },
            { title: "מספר מקלחות", value: order.NumberOfBaths || "N/A" },
            { title: "תיאור", value: order.JobDescription || "N/A" },
            { title: "סטטוס הזמנה", value: order.orderStatus ? order.orderStatus : "N/A" },
            { title: "מזהה הזמנה", value: order.orderId ? order.orderId.slice(0, 17) + " ..." : "N/A" },
            { title: "גודל הדירה במטרים", value: order.ApartmentSize || "N/A" },
            { title: "נוצרה ב", value: order.createdAt ? new Date(order.createdAt).toLocaleString('he-IL') : "N/A" },
            { title: "עודכנה ב", value: order.updateAt ? new Date(order.updateAt).toLocaleString('he-IL') : "N/A" },
            { title: "מחיר לשעה", value: order.orderPrice || "N/A" }
        ];
            
     return   <div key={order.orderId} 
                   style={Style.RowContainer}
              >
               <div style={Style.Row} onClick={() => handleRowClick(index)}>
                  <div style={{...Style.orderDetail,width:"7%"}}> {index + 1}</div>
                  <div style={Style.orderDetail}>{order.orderPhone}</div>
                  <div style={Style.orderDetail}>{order.addres}</div>
                  <div style={Style.orderDetail}>{new Date(order.ResurveDate).toLocaleString('he-IL').slice(0,10) || "N/A"}</div>
              </div>
            <AnimatePresence>

            {expandedOrder === index ? 
                
              
              <motion.div
                key={"dropdown"}
                style={Style.expandedDetails}
                initial={{ opacity: 0, y: 400, x: 300 , height:0 }}
                animate={{ opacity: 1, y: 0, x: 0, height:"auto"  }}
                exit={{ height:0 , opacity:0 }}
                transition={{
                  height: { duration: 2, type:"spring"  },
                  opacity: { duration: 0.5 },
                  x: { duration: 2, type: "spring" },
                  
                }}
                 
              >
               <DataList 
                    orientation="horizontal"
                    padding={"2em"}
                    
                   
                    
                    >
                       {orderDetails.map((item) => (
                <DataListItem
                  fontSize={!md? "14px" : "16px"}
                  style={{padding:"2px" , lineHeight:!md? "10px" : "16px" , }}
                  key={item.label}
                  label={item.title}
                  value={item.value}

        />
      ))}
               </DataList>
                
              
                

                <div style={Style.BtnsWrap}>

                  <button 
                        onClick={() => handleRemoveOrder(order.orderId)}
                        style={{   
                        ...Style.button,
                        backgroundColor: Colors.d
                        }
                        }>
                    {isRemoving ? 'מוחק...' : 'מחק'}
                 </button>
                  <UiDialog 
                  buttonStyle={{     
                     ...Style.button,
                      backgroundColor: Colors.d
                      }}
                      buttonText="ערוך הזמנה">
                    <NewOrder orderId={order.orderId} />
                  </UiDialog>
                </div>

              </motion.div>
            :null}
            </AnimatePresence>

        </div>
      })}

      <div style={Style.newOrderWrap}>
        <UiDialog
          buttonText="הזמנה חדשה"
          buttonStyle={{
            ...Style.button,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: Colors.d,
          }}
          Icon={<IoMdAddCircle size="2em" color={Colors.c} />}
        >
          <NewOrder newOrder={true} />
        </UiDialog>
      </div>
    </Container>
  );
};

export default UserOrders;
