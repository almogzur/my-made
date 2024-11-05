import { useSession } from 'next-auth/react';
import { useContext, useState, Fragment } from 'react';
import useUser from '../../lib/hooks/useUser';
import Colors from '../../lib/colors';
import UiDialog from '../../components/dialog/ui-dialog';
import NewOrder from './new-order';
import LoadingSpinner from '../../components/my-spinner/loading-spinner';
import { WindowWidthContext } from '../../context';
import { IoMdAddCircle } from "react-icons/io";
import { motion , AnimatePresence } from 'framer-motion';
import { DataListItem, DataListRoot as DataList } from "../../components/ui/data-list"
import { Button, Container, Flex, Text } from '@chakra-ui/react';

const UserOrders = () => {

  const { data: session, status, update } = useSession();
  const { user, isLoading, isValidating,  userError, mutate } = useUser(session?.user?.email);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const { xl, lg, md, sm } = useContext(WindowWidthContext);

  const Style = {

    headline: {
      textAlign: 'center',
      fontSize: "2em",
      color: Colors.c,
      fontWeight: 'bold',
      marginBottom: "20px",
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
      fontSize: md && sm ? "16px" : "12px",
      color: "#333",
      width:"30%",
      overflow:"clip",
      
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

    newOrderWrap: {
      display: 'flex',
      justifyContent: 'center',

    },
  };

  if (status === 'loading' || isLoading || isRemoving ) {
    return <LoadingSpinner />;
  }

  const handleClick = (index) => {
    setExpandedOrder(expandedOrder === index ? null : index);
  };

  const handleRemoveOrder = async (orderId) => {
    setIsRemoving(true);
    try {
      const res = await fetch(`/api/customer/remove-order?orderId=${orderId}`, { method: 'DELETE' });
      const data = await res.json();

      if (res.ok) {
        update();
        mutate()
      }
    } catch (error) {
      console.error('Failed to remove order:', error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <Container background={"#fff"} >

      <Text style={Style.headline}>הזמנות</Text>
      
         <Flex  justifyContent={"space-around"} alignItems={"center"} style={Style.ordersMainRow} background={"gray.300"} height={"60px"} >
            <Text style={{...Style.orderDetail,width:"7%"}}> #</Text>
            <Text style={Style.orderDetail}>טלפון</Text>
            <Text style={Style.orderDetail}>כתובת</Text>
            <Text style={Style.orderDetail}>תאריך</Text>
          </Flex>

      {user?.Orders?.map((order, index) => {
        const orderDetails = [
            { title: "מחיר לשעה", value: order.orderPrice || "N/A" },
            { title: "מזמין", value: order.name },
            { title: "טלפון", value: order.orderPhone },
            { title: "סטטוס הזמנה", value: order.orderStatus ? order.orderStatus : "N/A" },
            { title: "תאריך ושעה", value: order.ResurveDate ? new Date(order.ResurveDate).toLocaleString('he-IL').slice(0,10)  : "N/A" },
            { title: "עיר", value: order.city || "N/A" },
            { title: "כתובת", value: order.addres || "N/A" },
            { title: "מספר חדרים", value: order.ApartmentRoomsNumber || "N/A" },
            { title: "מספר מקלחות", value: order.NumberOfBaths || "N/A" },
            { title: "תיאור", value: order.JobDescription || "N/A" },
            { title: "גודל הדירה במטרים", value: order.ApartmentSize || "N/A" },
            { title: "נוצרה ב", value: order.createdAt ? new Date(order.createdAt).toLocaleString('he-IL') : "N/A" },
            { title: "עודכנה ב", value: order.updateAt ? new Date(order.updateAt).toLocaleString('he-IL') : "N/A" },
            { title: "מזהה הזמנה", value: order.orderId ? order.orderId.slice(0, 20) : "N/A" },
        ];
            
    return  <Flex 
                  direction={"column"} 
                  borderBottom={"1px solid #ddd"} p={1}
                  key={order.orderId} 
              >
                 <Container p={0} overflow={"hidden"} style={Style.Row} onClick={() => handleClick(index)}>
                   <Text style={{...Style.orderDetail,width:"7%"}}> {index + 1}</Text>
                    <Text style={Style.orderDetail}  >{order.orderPhone}</Text>
                  <Text style={Style.orderDetail}>{order.addres}</Text>
                  <Text style={Style.orderDetail}>{new Date(order.ResurveDate).toLocaleString('he-IL').slice(0,10) || "N/A"}</Text>
                </Container>

                <AnimatePresence>

            {expandedOrder === index && 
             <Flex  direction={"column"} justifyItems={"center"} alignItems={"center"} >
              <motion.div
                key={"dropdown"}
                initial={{ opacity: 0, y: 400, x:200,  height:0 }}
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
                    marginTop={"10px"}  
                    p={0}       
                    size={"sm"}
                    
                 
               
               
        
                    >
            {orderDetails.map((item) => (
                <DataListItem
                
                   fontSize={!md? "12px" : "16px"}
                   
                   style={{padding:"0px" , lineHeight:"13px", margin:"0px" }}
                   key={item.label}
                   label={item.title}
                   value={item.value}

                    
        />
      ))}
               </DataList>
                             
                

                <Flex flexWrap={"wrap"} justifyContent={"space-evenly"} >

                  <Button 
                        onClick={() => handleRemoveOrder(order.orderId)}
                        style={{   
                        ...Style.button,
                        backgroundColor: Colors.d
                        }
                        }>
                    {isRemoving ? 'מוחק...' : 'מחק'}
                 </Button>

                  <UiDialog 
                  buttonStyle={{     
                     ...Style.button,
                      backgroundColor: Colors.d
                      }}
                      buttonText="ערוך הזמנה">
                    <NewOrder orderId={order.orderId} />
                  </UiDialog>
                </Flex>

              </motion.div>
              </Flex>
            }
                </AnimatePresence>

            </Flex>
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
