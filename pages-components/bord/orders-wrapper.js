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


                <AnimatePresence mode={  "wait"} >
                {Array.isArray(orders) && filterCity  &&   
                    orders.map( (order,i) =>                  
                     xs ? 
                     <motion.div
                      key={order._id} 

                       initial={{ opacity: 0, height:0}}
                       animate={{ opacity: 1, height:"auto",
                              transition: { 
                                opacity:{duration:1},
                                height:{duration:1 , type:"spring" ,stiffness: 100 ,  }
                               },
                         }}
                       exit={{ opacity: 0,x:"100%", height:0,  
                         transition :{ 
                             opacity:{duration:1 },
                             x:{duration:0.3}
                          
                          

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
                       animate={{ opacity: 1 ,  height: "auto",
                            transition: {
                                  height:{  duration:0.5,    type: "spring", stiffness: 100 , },
                                  opacity:{ duration:1 }
                               },
                                }}
                       exit={{ opacity: 0,  height:0 , x:200,
                            transition :{ 
                              x:{duration:.5},
                              opacity:{duration:.5}      ,
                              height:{duration:.5}
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
                     )}
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
              w={"100%"}
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
          variant="solid"
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
             <Flex   p={2} m={2}  boxShadow={"xl"} alignItems={"center"} justifyContent={"space-around"}>    
            
             {!isExpanded && 
             <>
               <Flex direction={"column"} >

                     <Text  fontSize={"md"}     fontWeight={"bold"}  > שעתון :  {order?.price}</Text>
                     <Text     fontSize={"md"} fontWeight={"bold"} > תאריף {midTail}</Text>
                     <Text   fontSize={"md"}     fontWeight={"bold"}  > כתובת: { order.address }</Text>
         

                 
                    
              </Flex>
              <Button onClick={() => handleExpand(itemIndex)}>
                    פרטים
                 </Button>
      
                 </>
             }
             
      
                 
      
              
              <AnimatePresence mode="popLayout">
                         {isExpanded && (
                            <motion.div
                              initial={{  opacity: 0 }}
                               animate={{  opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                         
                         >
                 
                            <Flex direction={"column"}>
                              <ModDataList    Fields={Fields}  headingText={"פרטי הזמנה "} />

                                <Button 
                            backgroundColor={Colors.c} 
                            color="#fff" 
                            variant="outline" 
                       
                            onClick={(e)=> hndler( e ,order,  session?.user?.email )}
                          >
                            <Text>קח הזמנה</Text>  
                               </Button>

                               <Button onClick={() => handleExpand(itemIndex)}>
                                 {isExpanded ? ' סגור' : ' פרטים'}
                               </Button>

                            </Flex>
       

                            </motion.div>
                            )}
                            
              </AnimatePresence>
            
            
         


       
            </Flex>
 
  
  );
};