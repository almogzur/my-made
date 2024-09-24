import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import useUser from '../../lib/hooks/useUser';
import Colors from '../../lib/colors';
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner';
import Dialogui from '../../components/dialog/ui-dialog';
import NewOrder from './new-order';
import { StateContext } from '../../context';

const Style = { 
  Wrapper: {
    padding: "0px",
    tran: "ease out 1s",
    borderBottom: "solid 1px black",
    width: "100%", 
  },
  table: {      
    height: "70%",
    border: "solid",
    borderCollapse: "collapse",
    width: "100%",
  },
  tableHead: {
    background: Colors.d,
  },
  tableBody: {},
  tableRow: {
    height: "30px",
    border: "solid",
    borderCollapse: "collapse",
    border: "solid 1px",
    
  },
  cell: {
    border: "solid",
    cursor: "pointer",
    border: "solid 1px",
  },
  expandedRow: {
    backgroundColor: '#f0f0f0',
    border: "solid 1px",
  },
  button: {
    background: Colors.d,
    color: Colors.a,
    marginTop: '15px',
    width: "100px",
    height: "35px",
    marginBottom: "15px",
  },
  editButton: {
    background: Colors.b,
    color: Colors.c,
    marginLeft: "10px",
  },
};

const CustomerOrderList = () => {
  const { data: session, status, update } = useSession();
  const [state, setState] = useContext(StateContext)
  const { user, isLoading } = useUser(session?.user?.email);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // Track dialog state

  if (status === 'loading' || isLoading) {
    return <MongoSpinner propsname={"רושם הזמנה חדשה"} />;
  }

  const handleRowClick = (index) => {
    setExpandedOrder(expandedOrder === index ? null : index);
  };

  const handleRemoveOrder = async (orderId) => {
    setIsRemoving(true);
    try {
      const res = await fetch('/api/customer/remove-order', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

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


  const closeDialog = () => {

    setOpenDialog(false); // Close dialog

    setState(prevState => ({
      ...prevState,
      Order: []// Resetting the state for a new order
    }));
  };

  return (
    <>
      {user?.Orders ? (
        <div style={Style.Wrapper}>
          <h3 style={{ textAlign: "center" }}>הזמנות</h3>
          <table style={Style.table}>
            <thead style={Style.tableHead}>
              <tr style={Style.tableRow}>
                <td style={Style.cell}>&nbsp;</td>
                <td>כתובת</td>
                <td>טלפון</td>
                <td>שעה ותאריך</td>
              </tr>
            </thead>
            <tbody>
              {user?.Orders.map((order, index) => (
                <>
                  <tr 
                    key={index} 
                    style={Style.tableRow} 
                    onClick={() => handleRowClick(index)}
                  >
                    <td style={Style.cell}>{index + 1}</td>
                    <td>{order.addres}</td>
                    <td>{order.orderPhone}</td>
                    <td>{`  ${order.ResurveDate.slice(11,-7)}  ${order.ResurveDate.slice(5,10)}   `}</td>
                  </tr>

                  {expandedOrder === index && (
                    <tr style={{ ...Style.tableRow, ...Style.expandedRow , background:Colors.a , color:Colors.d , lineHeight:"25px"}}>
                      <td colSpan="4">
                          <strong> מחיר הזמנה : </strong> {order.orderPrice || "N/A"}<br/>
                          <strong>תיאור :</strong> {order.JobDescription || "N/A"}<br/>
                          <strong>מספר חדרים :</strong> {order.ApartmentRoomsNumber || "N/A"}<br/>
                          <strong>מספר מקלחות : </strong> {order.NumberOfBaths || "N/A"}<br/>
                          <strong>כתובת :</strong> {order.addres || "N/A"}<br/> {/* Address field */}
                          <strong>עיר :</strong> {order.city || "N/A"}<br/>
                          <strong>גודל הדירה במטרים :</strong> {order.ApartmentSize || "N/A"}<br/> {/* Apartment size */}
                          <strong>תאריך ושעה :</strong> {new Date(order.ResurveDate).toLocaleString('he-IL') || "N/A"}<br/> {/* Reservation date */}
                          <strong>נוצרה ב :</strong> {new Date(order.createdAt).toLocaleString('he-IL') || "N/A"}<br/>
                          <strong>סטטוס הזמנה :</strong> {order.orderStatus || "N/A"}<br/> {/* Order status */}
                          <strong>מזהה הזמנה :</strong> {order.orderId.slice(0,20) + " ... " || "N/A"}<br/>
                      <div style={{display:"flex"}}>
                        <button 
                          onClick={() => handleRemoveOrder(order.orderId)} 
                          disabled={isRemoving}
                          style={Style.button}
                        >
                          {isRemoving ? 'מוחק...' : 'מחק הזמנה'}
                        </button>

                        <Dialogui
                          perentOpenModle={openDialog}
                          perntHendler={closeDialog}
                          buttonText={"ערוך הזמנה "}
                          CloseDialogButtonStyle={{ ...Style.button, ...Style.editButton }}
                        >
                          <NewOrder
                            orderId={order.orderId}
                       
                          />
                        </Dialogui>
                        </div>
     
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <DemoList />
      )}
    </>
  );
};

const DemoList = () => {
  return (
    <div style={Style.Wrapper}>
      <h3 style={{ textAlign: "center" }}>הזמנות</h3>
      <table style={Style.table}>
        <thead style={Style.tableHead}>
          <tr style={Style.tableRow}>
            <td style={Style.cell}>&nbsp;</td>
            <td>כתובת</td>
            <td>טלפון</td>
            <td>תאריך</td>
          </tr>
        </thead>
        <tbody>
          <tr scope="col" style={Style.tableRow}>
            <td style={Style.cell}>1</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomerOrderList;
