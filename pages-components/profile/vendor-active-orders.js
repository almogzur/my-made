import { useSession } from "next-auth/react";
import useUser from "../../lib/hooks/useUser";
import { Flex, Container , Heading ,Stack ,Icon , Text, Badge } from "@chakra-ui/react";
import Colors from '../../lib/colors'



import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../../components/ui/accordion"
import { useEffect } from "react";
import { DataListItem, DataListRoot } from "../../components/ui/data-list"
import BadgeStatus from "../../components/badge_status";

const VendorActiveOrders = () => {

  const { data: session ,status ,update} = useSession()
  const { user, isLoading, isValidating,  userError, updateUser } = useUser(session?.user?.email);

  const VendorOrders = user?.Vendor?.Vendor_Orders
  const na = "לא זמין "
  
    return (

      <Flex direction={"column"} p={4} bg={"#fff"}  mb={'100px'} alignItems={"center"} >

          <Heading p={4} fontSize={"3xl"} color={Colors.c} >הזמנות משק</Heading>
      
 

            <AccordionRoot collapsible defaultValue={["b"]}>   



             { Array.isArray(VendorOrders) &&
                VendorOrders?.map((order, index) => {
                  const Fields = [
                     { label: "חדרים", value: order.rooms },
                     { label: "תאריך", value: order.date.slice(0,1) },
                     {label : "משעה", value:""},
                     {label : "ש", value:""},
                     { label: "עיר", value: order.city },
                     { label: "כתובת", value: order.address },
                     { label: "אמבטיות", value: order.baths },
                     { label: "תיאור העבודה", value: order.jobDescription },
                     { label: "גודל", value: order.size },
                     { label: "נוצר בתאריך", value: new Date(order.createdAt).toLocaleString('he-IL') },
                     // update this to fisplay only if clinet update the order 
                     { label: "עודכן בתאריך",  value:  order.updateAt ? new Date(order.updateAt).toLocaleString('he-IL') :   na}
    ];

            return     <AccordionItem key={index} value={index}>

                    <AccordionItemTrigger>

                       <Flex gap={"5px"}  direction={"row-reverse"}   >
                          {<Heading fontSize={"medium"}  >שם : {order.name}  </Heading>}
                          {<Heading fontSize={"medium"} >טלפון :  {  order.phone}</Heading>}
                          {<Badge colorPalette={"green"} size={"lg"} > {  order.price + ` שח `}   </Badge>}
                    </Flex>
                    </AccordionItemTrigger>


                    <AccordionItemContent>
                         { 
                          <Flex direction={"column"} p={1}  >
                              { Fields.map((item)=>{
                                          // only dispaly the item if it not Nullish
                                      return item.value?   <Flex  borderBottom={`dotted 0.8px `}  >
                                                  <Heading fontSize={"medium"} width={"50%"} textAlign={"start"} >{item.value} </Heading>
                                                  <Heading fontSize={"medium"}  width={"50%"} textAlign={"end"}  key={item.value}   > {item.label}  </Heading>
                                              </Flex>
                                              :null
                        })
                        } 
                     </Flex>
                      }
                   </AccordionItemContent>


                </AccordionItem>
              } )}
          </AccordionRoot>
            

      </Flex>
    );
  };
  
 
  
  export default VendorActiveOrders;
  
  const items = [
    {
      value: "info",
      title: "Product Info",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum.",
    },
    {
      value: "stats",
      title: "Stats",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum.",
    },
  ]
  