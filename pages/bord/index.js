import { useSession } from 'next-auth/react';
import { useEffect, useState  , useContext} from 'react';
import { useRouter } from 'next/router';
import { FilterCityContext } from '../../context';
import Colors from '../../lib/colors';
import HomeNavigation from '../../pages-components/home/home-navigation'
import BordTools from '../../pages-components/bord/bord-tool'
import OrdersWrapper from '../../pages-components/bord/orders-wrapper';



const Style = {
  wrapper: {
    
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#F0F2F5',      
    background:Colors.d,

  },
  child: {
    flex: '1 1 100%',
    
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
    return <h1 style={{textAlign: 'center'}}>Loading User Info ...</h1>;
  }


  return (

    <>
      <HomeNavigation/>
      <div style={Style.wrapper} >
      
          <div style={Style.child}>
            <BordTools
                 setMode={setMode}
                 setFilterCity={setFilterCity}
                 setFilterPriceArray={setFilterPriceArray}
           />
          </div>

          <div style={Style.child}>
                <OrdersWrapper
                    Mode={Mode}
                    filterCity={filterCity}
                     setFilterCity={setFilterCity}
          /> 
          </div>


      </div>


      </>
  );
};

export default BoardPage;
