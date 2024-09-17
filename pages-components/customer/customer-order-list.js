import { useSession } from 'next-auth/react';
import { useState } from 'react';
import useUser from '../../lib/hooks/useUser';
import Colors from '../../lib/colors';
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner';

const Style = { 
  Wrapper: {
    padding: "0px",
    tran:"ease out 1sß",
    borderBottom: "solid 1px black",
    width:"100%", 
  },
  table: {      
    height: "70%",
    border: "solid",
    borderCollapse: "collapse",
    width:"100%"
  },
  tableHead: {
    background: Colors.d,
  },
  tableBody: {},
  tableRow: {
    height: "30px",
    border: "solid",
    borderCollapse: "collapse",
    border:"solid 1px"
  },
  cell: {
    border: "solid",
    cursor: "pointer" ,
    border:"solid 1px"
  },
  expandedRow: {
    backgroundColor: '#f0f0f0',
    border:"solid 1px"
  }
};

const CustomerOrderList = () => {
  const { data: session, status, update } = useSession();
  const { user, isLoading, isError } = useUser(session?.user?.email);
  const [expandedOrder, setExpandedOrder] = useState(null); // State to track expanded order
  const [isRemoving, setIsRemoving] = useState(false); // Loading state for order removal

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
        // Optionally trigger a re-fetch or remove the order from state here
        update(); // This refreshes the session and triggers a re-fetch of user data
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
                <td>שעה ותאריך </td>
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
                    <td>{`  ${order.ResurveDate.slice(11,-7)}  ${order.ResurveDate.slice(5,10)}   `}  </td>
                  </tr>

                  {expandedOrder === index && (
                    <tr style={{ ...Style.tableRow, ...Style.expandedRow , background:Colors.a , color:Colors.d }}>
                      <td colSpan="4">
                        <strong>מחיר הזמנה:</strong> {order.orderPrice}<br/>
                        <strong>תיאור:</strong> {order.JobDescription}<br/>
                        <strong>מספר חדרים:</strong> {order.ApartmentRoomsNumber || "N/A"}<br/>
                        <strong>מספר מקלחות:</strong> {order.NumberOfBaths || "N/A"}<br/>
                        <strong>נוצרה ב:</strong> {new Date(order.createdAt).toLocaleString('he-IL')}<br/>
                        
                        <button 
                          onClick={() => handleRemoveOrder(order.orderId)} 
                          disabled={isRemoving}
                          style={{ background: 'red', color: 'white', marginTop: '10px' }}
                        >
                          {isRemoving ? 'מוחק...' : 'מחק הזמנה'}
                        </button>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <DemoLisat />
      )}
    </>
  );
};

export default CustomerOrderList;

const DemoLisat = () => {
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
