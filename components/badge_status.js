import { Badge } from "@chakra-ui/react";

const BadgeStatus =   ({status}) =>{

    switch(status){
      case "Open": return <Badge colorPalette={"green"} >פתוחה</Badge> ;
      break;
      case "Updated" : return <Badge colorPalette={"orange"}>עודכנה </Badge>;
      break;
      default: return <Badge colorPalette={"red"} >err</Badge>
    }
}

export default BadgeStatus