
import { WindowWidthContext } from '../../context'
import React, { useContext, useEffect } from 'react';
import Menu from "./menu"
import MobNav from './mob-nav';
 
const HomePageNavigation = () => {

    const { xl, lg, medium ,small } = useContext(WindowWidthContext);

    return  lg? <Menu/> : <MobNav/> 
};








export default HomePageNavigation;
