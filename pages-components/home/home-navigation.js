
import { WindowWidthContaxt } from '../../context'
import React, { useContext, useEffect } from 'react';
import Menu from "./menu"
import SideBard from './side-bar'

 
const HomePageNavigation = () => {

    const {  large, medium ,small } = useContext(WindowWidthContaxt);

    return  large? <Menu/> : <SideBard/> 
};








export default HomePageNavigation;
