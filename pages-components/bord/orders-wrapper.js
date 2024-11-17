import { useSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react';
import {FilterCityContext } from '../../context'
import LoadingSpinner from '../../components/my-spinner/loading-spinner';
import { Badge,Container, Flex , Button ,Text , Heading} from "@chakra-ui/react"

import {motion} from 'framer-motion'
import Colors from '../../lib/colors';
import useOrders from '../../lib/hooks/useOrders';
import { WindowWidthContext } from '../../context';
import { AnimatePresence } from 'framer-motion';
import ModDataList  from '../../components/modified-data-list';




const Orders=({})=>{

  const [ filterCity, setFilterCity ] = useContext(FilterCityContext)
  const [ isFetch, setIsFetch] = useState(false)
  const  [ orderIsRemoved , setOrderIsRemoved] = useState(null)
  const { orders, orderError , isOrderLoading , isOrderValidating , mutateOrders } = useOrders(filterCity)
  const { xxl,xl,lg,md,sm,xs,xxs } = useContext(WindowWidthContext);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  const orderHandler = async (e, order, vendorEmail) => {
    console.log(e);
    
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendorEmail, order }),
      };

      const res = await fetch(`/api/bord/update-owner`, options);

      if (res.ok) {
        setTimeout(()=>mutateOrders(),3000)
          
        }
      
    } catch (error) {
      alert(error);
    }
  };
  
 if(isFetch){ 
    return <Flex
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                bg={"gray.200"}
                height={"12em"}
                width={'100%'}

                >

             <LoadingSpinner/>
            </Flex> 
  }
     
 return (  

          <Container minHeight={"100vh"}>
            <Flex justifyContent={"center"} h={"100%"} >

              <Container maxWidth={"1000px"} p={0} m={0} >


              <AnimatePresence mode='awit' >

                {Array.isArray(orders) && filterCity  &&   
                    orders.map( (order,i) =>                  
                     xs ? 
                     <motion.div
                      key={order._id} 

                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: "auto",
                              transition: { type: "spring", stiffness: 100 },
                         }}
                       exit={{ opacity: 0, y: -300 ,
                         transition :{ 
                             y:{duration:2},
                             opacity:{duration:2}

                          }
                         }}
                     >
                      <BigCard 
                         order={order} 
                         itemIndex={i} 
                         key={i} 
                         expandedIndex={expandedIndex}
                         handleExpand={handleExpand}
                         hndler={orderHandler}
                    />
                    </motion.div>
     
                    :
                    <motion.div
                      key={order._id} 

                       initial={{ opacity: 0, height: 0 }}
                       animate={{
                            opacity: 1,
                            height: "auto",
                            transition: {
                               type: "spring", stiffness: 300
                               },
                                }}
                      exit={{ opacity: 0, x: -300 ,
                            transition :{ 
                              x:{duration:2},
                              opacity:{duration:2}      
                            }
                            }}
                     >
                    <SmallOrderCard
                       order={order}
                       itemIndex={i} 
                       key={i} 
                       expandedIndex={expandedIndex}
                       handleExpand={handleExpand}
                       hndler={orderHandler}
                    />       
                    </motion.div>   
                   )
                       

                        }
                </AnimatePresence>     

                       
              </Container>  
                

            </Flex>           
         </Container> 


 )
}


export default Orders



const SmallOrderCard = ({ order, itemIndex, expandedIndex, handleExpand , hndler }) => {
  const { data: session } = useSession();
  const isExpanded = expandedIndex === itemIndex;
  const formattedDate = new Date(order.date).toLocaleDateString("he-IL");
  const EssentialFields = [
    { label: "כתובת", value: order.address },
    { label: "תאריך", value: formattedDate },
    { label: "שעתון", value: `${order.price} שח` },
  ];

  return (    
      <Flex
        m={2}
        p={2}
        boxShadow="xl"
        borderRadius="md"
        bg="white"
        direction="column"
    
        justifyContent="space-between"
      >
        {/* Condensed View */}
        <Flex direction="column" mb={2}>
          <Text fontSize="sm" fontWeight="bold">
            כתובת: {order.address}
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            תאריך: {formattedDate}
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            שעתון: {order.price} שח
          </Text>
        </Flex>

        <AnimatePresence mode="sync">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
            >
              <ModDataList Fields={EssentialFields} headingText="פרטי הזמנה" />
              <Button
                backgroundColor={Colors.c}
                color="#fff"
                mt={2}
                onClick={(e) => hndler(e, order, session?.user.email)}
              >
                קח הזמנה
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={() => handleExpand(itemIndex)}
          mt={2}
          variant="outline"
          size="sm"
        >
          {isExpanded ? "סגור" : "פרטים"}
        </Button>
      </Flex>
  );
};

const BigCard = ({ order, itemIndex, expandedIndex, handleExpand , hndler }) => {

  const { xxl,xl,lg,md,sm,xs,xxs } = useContext(WindowWidthContext);
  const { data: session, status } = useSession();
  const {  mutateOrders } = useOrders()

      

  const isExpanded = expandedIndex === itemIndex 

  const midTail = new Date(order.date).toLocaleString('he-IL').slice(0,10)
  const shortTail = midTail.slice(0,5)

  const Fields = [
    { label:"טלפון " , value:order.phone},
    { label: "כתובת", value: order.address },
    { label: "חדרים", value: order.rooms },
    { label: "תאריך", value: midTail },
    { label : "לשעה", value:order.hour},
    { label: "אזור / עיר", value: order.city },
    { label: "בקשות", value: order.jobDescription },
    // update this to fisplay only if  update the order 
    { label: "עודכן בתאריך",  value:  order.updatedByUserAt ? new Date(order.updatedByUserAt).toLocaleString('he-IL') :  ""},
    { label:"שעתון" , value: order.price + " שח",  }
   ];

  return (        
             <Flex  
                 m={2}  
                 mb={1}
                 boxShadow={"xl"}
                 p={2}                 
                 alignItems={"center"}
                justifyContent={"space-around"}
             >    

                  
                  
              <Flex direction={"column"} >

                     <Text  fontSize={"md"}     fontWeight={"bold"}  > שעתון :  {order?.price}</Text>
                     <Text     fontSize={"md"} fontWeight={"bold"} > תאריף {midTail}</Text>
                     <Text   fontSize={"md"}     fontWeight={"bold"}  > כתובת: { order.address }</Text>


                     <AnimatePresence mode="sync">
                         {isExpanded && (
                            <motion.div
                          initial={{  opacity: 0 }}
                          animate={{  opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                         
                         >
                            <Flex direction="column"  fontWeight={"bold"} justifyContent={"space-around"}  >
                            <ModDataList Fields={Fields}  headingText={"פרטי הזמנה "} />

                          <Button 
                            backgroundColor={Colors.c} 
                            color="#fff" 
                            variant="outline" 
                       
                            onClick={(e)=> hndler( e ,order,  session?.user?.email )}
                          >
                            <Text>קח הזמנה</Text>  
                          </Button>

                          </Flex>
                            </motion.div>
                            )}
                    </AnimatePresence>

              </Flex>

              <Button
                 onClick={() => handleExpand(itemIndex)}
                 p={0}
                 h={"50px"}  //  fix size to prevent layout shift when text swap 
                 width={"60px"} // same
               >
                 {isExpanded ? ' סגור' : ' פרטים'}
             </Button>
       
            </Flex>
 
  
  );
};