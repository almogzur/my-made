import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import BoardToolsBar from '../../pages-components/board/board-tools-bar';
import OrdersWrapper from '../../pages-components/board/orders-wrapper';
import BoardLayout from '../../layouts/board-layout';



const BoardPage = () => {
  const router = useRouter();

  // Session and user data
  const { data: session, status } = useSession();



  // State for orders and filters

  const [Mode, setMode] = useState("Cards");
  const [filterCity, setFilterCity] = useState(null);
  const [filterPriceArray, setFilterPriceArray] = useState([300, 0]);  // 300 max price


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

    <BoardLayout>
    
      <BoardToolsBar
        setMode={setMode}
        setFilterCity={setFilterCity}
        setFilterPriceArray={setFilterPriceArray}

      />
      <h3 style={{textAlign: "center"}}>
        {filterCity ? `מציג הזמנות ${filterCity}` : null}
      </h3>

      <OrdersWrapper
        Mode={Mode}
        filterCity={filterCity}
      />

</BoardLayout>
  );
};

export default BoardPage;
