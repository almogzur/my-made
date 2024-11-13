import { useSession } from 'next-auth/react';
import { useEffect, useState  , useContext} from 'react';
import { useRouter } from 'next/router';
import { FilterCityContext } from '../../context';
import Colors from '../../lib/colors';
import Navigation from '../../pages-components/navigation'
import BordTools from '../../pages-components/bord/bord-tool'
import OrdersWrapper from '../../pages-components/bord/orders-wrapper';
import { Container, Flex } from '@chakra-ui/react';
import LoadingSpinner from '../../components/my-spinner/loading-spinner';



const Style = {
  wrapper: {
    
  
    background:Colors.d,

  },

};

const BoardPage = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const [Mode, setMode] = useState("Cards");
  const [filterCity, setFilterCity] = useContext(FilterCityContext);
  const [filterPriceArray, setFilterPriceArray] = useState([300, 0]);  


  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);


  if (status === 'loading' ) {
    return <LoadingSpinner/>
  }


  return (
  <>
        <Navigation/>
           <Container >
             <Flex direction={"column"} gap={"20px"}  >
                    <BordTools setMode={setMode} setFilterCity={setFilterCity} setFilterPriceArray={setFilterPriceArray} />
                    <OrdersWrapper  Mode={Mode} filterCity={filterCity} setFilterCity={setFilterCity} /> 
            </Flex>
         </Container>
</>        


      
  );
};

export default BoardPage;
