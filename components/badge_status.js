import { Badge } from "@chakra-ui/react";

const BadgeStatus =   ({status}) =>{

  const h = "40px"
  const w = "60px"

    switch(status){
      case "Open": return <Badge width={w} height={h} colorPalette={"green"} justifyContent={"center"} >{`חדשה`}</Badge> ;
      break
      case "inProcess" : return <Badge justifyContent={"center"} width={w} height={h} colorPalette={"orange"}>בטיפול</Badge>;
      break
      default: return <Badge justifyContent={"center"} width={w} height={h} colorPalette={"red"} >סגורה </Badge>
    }
}

export default BadgeStatus