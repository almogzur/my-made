import { m, LazyMotion } from 'framer-motion';
import f from "../../lib/features";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SideBar = ({
  children,
  callBack,
  style,
  className
}) => {
  const router = useRouter();
  const { pathname } = router;
  const [sideBarTLocation, setSideBarLocation] = useState('default');

  useEffect(() => {
    if(pathname){
    const inVendor = pathname.split("/").indexOf("vendor") !== -1;
    const inCustomer = pathname.split("/").indexOf("customer") !== -1;

    if (inVendor) {
        setSideBarLocation('vendor');
    } else if (inCustomer) {
        setSideBarLocation('customer');
    } else {
        setSideBarLocation('default');
    }
  }
  }, [pathname]); 

  const getAnimation = () => {
    switch (sideBarTLocation) {
      case 'vendor':
        return { x: [100, 0] }; // Example animation for vendor
      case 'customer':
        return { x: [-200, 0] }; // Example animation for customer
      default:
        return { y: [200, 0] }; // Default animation
    }
  };

  return (
    <LazyMotion features={f}>
      <m.aside
        className={className || null}
        style={{ ...style }}
        animate={getAnimation()}
        transition={{ duration: 1.5 }}
      >
        {children}
      </m.aside>
    </LazyMotion>
  );
}

export default SideBar;
