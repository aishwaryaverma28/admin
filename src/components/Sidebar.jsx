import React from 'react'
import items from './SidebarData';
import "../components/styles/Sidebar.css";
import SubMenu from './SubMenu';

const Sidebar = () => {
  
  return (
    <>
     {items.map((item,index) => <SubMenu key={index} {...item}/>) }
    </>
  )
}

export default Sidebar