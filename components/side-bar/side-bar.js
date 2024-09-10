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

  return (
    <LazyMotion features={f}>
      <m.aside
        className={className || null}
        style={{ ...style }}
        animate={{ opacity : [0,1]}}
        transition={{ duration: 1}}
      >
        {children}
      </m.aside>
    </LazyMotion>
  );
}

export default SideBar;
