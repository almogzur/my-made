import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppHead from '../../components/app-head/app-head';
import Footer from '../../components/footer/app-footer';
import BoardToolsBar from '../../pages-components/board/board-tools-bar';
import useUser from '../../lib/hooks/useUser';
import Colors from '../../lib/colors';
import Link from 'next/link';
import Image from 'next/image';
import OrdersWrapper from '../../pages-components/board/orders-wrapper';

const Style = {
  Fotter: { 
    marginTop: "3px",
    borderRadius: "5px",
    height: "50px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    background: Colors.d,
    width: "70px",
  },
  Profilelink: { 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: "50px",
    width: "75px",
    borderRadius: "7px",
    background: Colors.b
  }
};

const BoardPage = () => {
  const router = useRouter();

  // Session and user data
  const { data: session, status } = useSession();

  // State for orders and filters
  const [orders, setOrders] = useState([]);  // To store fetched orders
  const [Mode, setMode] = useState("Cards");
  const [filterCity, setFilterCity] = useState("");
  const [filterPriceArray, setFilterPriceArray] = useState([300, 0]);  // 300 max price
  const [renderList, setRenderList] = useState([]);

  // Fetch orders client-side when component mounts
  useEffect(() => {
    
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/board/orders');
        const data = await res.json();
        setOrders(data);
      } catch (error) {

        
        router.reload
      }
    };
  if(orders.length === 0){

    fetchOrders();
  }
   
  }, );

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Loading state
  if (status === 'loading' ) {
    return <h1 style={{textAlign: 'center'}}>Loading User Info ...</h1>;
  }

   // no orders  while react 
  else if (  orders.length === 0 ){
    return <h1 style={{textAlign: 'center'}}>Loading Orders...</h1>;

  }

  return (
    <>
      <AppHead />

      <BoardToolsBar
        setMode={setMode}
        setFilterCity={setFilterCity}
        setFilterPriceArray={setFilterPriceArray}
        setRenderList={setRenderList}
        Orders={orders} 
      />
      <h3 style={{textAlign: "center"}}>
        {filterCity ? `מציג הזמנות ${filterCity}` : null}
      </h3>

      <OrdersWrapper
        Mode={Mode}
        renderList={renderList}
        filterCity={filterCity}
      />

      <Footer>
        <div style={Style.Fotter}>
          <Link style={Style.Profilelink} href={"/profile"} shallow={true}>
            <Image
              src={session?.user?.image}
              height={40}
              width={40}
              style={{ borderRadius: "15px" }}
              alt="User Profile Link"
              fetchPriority="auto"
            />
          </Link>
        </div>
      </Footer>
    </>
  );
};

export default BoardPage;
