
import { WindowWidthContaxt } from '../../context'
import React, { useContext, useEffect } from 'react';
import Menu from "./menu"
import MobNav from './mob-nav';
 
const HomePageNavigation = () => {

    const {  large, medium ,small } = useContext(WindowWidthContaxt);

    return  large? <Menu/> : <MobNav/> 
};








export default HomePageNavigation;
