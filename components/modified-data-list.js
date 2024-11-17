import { DataListItem, DataListRoot } from '../components/ui/data-list'
import { Heading } from '@chakra-ui/react'

const ModDataList = ({Fields , size, headingText})=>{
    return (
        <DataListRoot p={4} size={size?? "sm"}  orientation="horizontal" style={{direction:"rtl"}}   >
          <Heading textAlign={"center"}  fontSize={"2xl"} >{headingText??""}</Heading>
  
          { Fields.map((item) => (
             item.value  && // only if value
         <DataListItem  key={item.label} label={item.label} value={item.value} p={0} m={0}  fontSize={"sm"}  />
    ))}
        </DataListRoot>
    
    )
  }
  export default ModDataList
