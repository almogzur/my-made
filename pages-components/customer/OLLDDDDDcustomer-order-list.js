import { useSession } from 'next-auth/react';
import { useContext, useState , Fragment } from 'react';
import useUser from '../../lib/hooks/useUser';
import Colors from '../../lib/colors';
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner';
import UiDialog from '../../components/dialog/ui-dialog';
import NewOrder from './new-order';
import { StateContext } from '../../context';


const CustomerOrderList = () => {

  const { data: session, status, update } = useSession();
  const { user, isLoading, userEroor } = useUser(session?.user?.email);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);


  const Style = { 
    Wrapper: {
      padding: "0px",
      tran: "ease out 1s",
      borderBottom: "solid 1px black",
      width: "100%", 
      marginTop:"2em"
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
      cursor: "pointer",
      border: "solid 1px",
  
    },
    expandedRow: {
      backgroundColor: '#f0f0f0',
      border: "solid 1px",

    },
    button: {
      color: Colors.a,
      marginTop: '15px',
      width: "100px",
      height: "35px",
      marginBottom: "15px",
      border:"none",
      borderRadius:"5px",
    },
  
  };
  

  if (status === 'loading' || isLoading) {
    return <MongoSpinner/>;
  }
  else if(userEroor){
      return <div>Eroor, {Array.isArray(userEroor) || typeof userEroor === "string" ? userEroor : null } </div>
  }

  const handleRowClick = (index) => {
    setExpandedOrder(expandedOrder === index ? null : index);
  };

  const handleRemoveOrder = async (orderId) => {
    setIsRemoving(true);
  
    const url = `/api/customer/remove-order?orderId=${orderId} `
    try {
      const res = await fetch(url ,{ method:'DELETE'});
      const data = await res.json()
      console.log(data);
  
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
    <>
      {user?.Orders ? (
        <div style={Style.Wrapper}>
          <h3 style={{ textAlign: "center" }}>הזמנות פתוחות</h3>

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

                <Fragment key={order.orderId}> 
                   {/* too add key to fragment need to import it can't use " <></>"" */}
                  <tr 
                    key={index} 
                    style={{...Style.tableRow ,   background: expandedOrder === index ? ` lightgray ` : ""    }} 
                    onClick={() => handleRowClick(index)}
                  
                  >
                    <td style={Style.cell}>{index + 1}</td>
                    <td>{order.addres}</td>
                    <td>{order.orderPhone}</td>
                    <td>{`  ${order.ResurveDate.slice(11,-7)}  ${order.ResurveDate.slice(5,10)}   `}</td>
                  </tr>

                  {expandedOrder === index && (
                    <tr
                     style={{ ...Style.tableRow, ...Style.expandedRow , background:Colors.a , color:"black" , lineHeight:"25px" , }}
                     key={`expanded-${order.orderId}`}
                     >
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
                    </tr>
                  )}
                </Fragment>
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
