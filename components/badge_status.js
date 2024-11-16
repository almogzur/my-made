import { Badge } from "@chakra-ui/react";

const BadgeStatus =   ({status , styleProp}) =>{

    switch(status){
      case "Open": return <Badge fontWeight={"bold"}   colorPalette={"green"} justifyContent={"center"} {...styleProp} >{`חדשה`}</Badge> ;
      break
      case "inProcess" : return <Badge fontWeight={"bold"}    justifyContent={"center"}  colorPalette={"orange"} {...styleProp} >בטיפול</Badge>;
      break
      default: return <Badge fontWeight={"bold"}    justifyContent={"center"}  colorPalette={"red"} {...styleProp} >סגורה </Badge>
    }
}

export default BadgeStatus