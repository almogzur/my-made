
import { WindowWidthContext } from '../context'
import React, { useContext, useEffect } from 'react';
import Menu from './menu';
import MobNav from './mob-nav';
 
const Navigation = () => {

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WindowWidthContext);

    return  lg? <Menu/> : <MobNav/> 
};




export default Navigation;
