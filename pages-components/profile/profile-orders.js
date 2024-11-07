import { useSession } from 'next-auth/react';
import { useContext, useState, Fragment } from 'react';
import useUser from '../../lib/hooks/useUser';
import Colors from '../../lib/colors';
import UiDialog from '../../components/dialog/ui-dialog';
import NewOrder from './profile-new-order';
import LoadingSpinner from '../../components/my-spinner/loading-spinner';
import { WindowWidthContext } from '../../context';
import { IoMdAddCircle } from "react-icons/io";
import { motion , AnimatePresence } from 'framer-motion';
import { DataListItem, DataListRoot as DataList } from "../../components/ui/data-list"
import {  Button, Container, Flex, Text } from '@chakra-ui/react';
import BadgeStatus from '../../components/badge_status';

const ProfileOrders = () => {

  const na = "מידע לא זמין"

  const { data: session, status, update } = useSession();
  const { user, isLoading, isValidating,  userError, updateUser } = useUser(session?.user?.email);
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
       //change this to saave to old orders and not remove 
  const handleRemoveOrder = async (e,Id) => {
      e.preventDefault()
      setIsRemoving(true);
    try {
      const res = await fetch(`/api/porfiile-orders/remove-order?Id=${Id}`, { method: 'DELETE' });
      const data = await res.json();

      if (res.ok) {
        update();
        updateUser()
      }
    } catch (error) {
      console.error('Failed to remove order:', error);
    } finally {
      setIsRemoving(false);
    }
  };



  return (
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:2 }}
  >
          <Container background={"#fff"} >

      <Text p={4} style={Style.headline}>הזמנות לקוח פתוחות</Text>
      
         <Flex  justifyContent={"space-around"} alignItems={"center"} style={Style.ordersMainRow} background={"gray.300"} height={"60px"} >
            <Text style={{...Style.orderDetail,width:"7%"}}> #</Text>
            <Text style={Style.orderDetail}>טלפון</Text>
            <Text style={Style.orderDetail}>כתובת</Text>
            <Text style={Style.orderDetail}>תאריך</Text>
          </Flex>
          

      {user?.Profile_Orders?.map((order, index) => {
        const orderDetails = [
            { title: "מחיר לשעה", value: order.price || na},
            { title: "מזמין", value: order.name },
            { title: "טלפון", value: order.phone },

            { title: "סטטוס הזמנה", value: order.status ?  <BadgeStatus status={order.status} /> : null  },
            { title: "תאריך ", value: order.date ? new Date(order.date).toLocaleString('he-IL').slice(0,10)  :na },
            { title:"" , value:""},
            { title:"" , value:""},
            { title: "עיר", value: order.city || na },
            { title: "כתובת", value: order.address || na },
            { title: "מספר חדרים", value: order.rooms || na },
            { title: "מספר מקלחות", value: order.baths || na },
            { title: "תיאור", value: order.jobDescription || na },
            { title: "גודל הדירה במטרים", value: order.size || na },
            { title: "נוצרה ב", value: order.createdAt ? new Date(order.createdAt).toLocaleString('he-IL') : na },
            { title: "עודכנה ב", value: order.updateAt ? new Date(order.updateAt).toLocaleString('he-IL') : na },
            { title: "מזהה הזמנה", value: order.Id ? order.Id.slice(0, 20) : na },
        ];
            
    return     <Flex 
                  direction={"column"} 
                  borderBottom={"1px solid #ddd"} p={1}
                  key={order.orderId} 
              >
                 <Container p={0} overflow={"hidden"} style={Style.Row} onClick={() => handleClick(index)}>
                   <Text style={{...Style.orderDetail,width:"7%"}}> {index + 1}</Text>
                    <Text style={Style.orderDetail}  >{order.phone}</Text>
                  <Text style={Style.orderDetail}>{order.address}</Text>
                  <Text style={Style.orderDetail}>{new Date(order.date).toLocaleString('he-IL').slice(0,10) || "N/A"}</Text>
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
                        onClick={(e) => handleRemoveOrder(e,order.Id)}
                        style={{   
                        ...Style.button,
                        backgroundColor: Colors.d
                        }
                        }>
                    {isRemoving ? 'בטל...' : 'בטל'}
                 </Button>

                  <UiDialog 
                  buttonStyle={{     
                     ...Style.button,
                      backgroundColor: Colors.d
                      }}
                      buttonText="ערוך הזמנה">
                    <NewOrder id={order._id} />
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
         </motion.div>
  );
};

export default ProfileOrders;
