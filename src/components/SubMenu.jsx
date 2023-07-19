import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubMenu = (item) => {
  const [open, setOpen] = useState(false);
  // const allowed = [];
  const allowed = [
    "/admin",
    "/admin/viewProfile/employeeProfile",
    "/admin/viewProfile/timeSheet",
    "/admin/viewProfile/documents",
    "/admin/viewProfile/salarySlip",
    "/admin/blog/add",
    "/admin/blog/view",
  ];

  if (item.subNav) {
    // Filter subNav items based on allowed paths
    const filteredSubNav = allowed.length === 0
      ? item.subNav
      : item.subNav.filter((subNavItem) => allowed.includes(subNavItem.path));

    if (filteredSubNav.length === 0) {
      // If no allowed subNav items, return null
      return null;
    }

    return (
      <div className={open ? 'sidebar-item open' : 'sidebar-item'}>
        <div className='sidebar-title' onClick={() => setOpen(!open)}>
          <span>{item.title}</span>
          <i className="fa-sharp fa-solid fa-angle-down toggle-btn"></i>
        </div>
        <div className='sidebar-content'>
          {filteredSubNav.map((child, index) => (
            <SubMenu key={index} {...child} />
          ))}
        </div>
      </div>
    );
  } else {
    if (allowed.length > 0 && !allowed.includes(item.path)) {
      // If item path is not allowed, return null
      return null;
    }

    return (
      <div className='sidebar-item'>
        <Link to={item.path || '#'} className='sidebar-title plain'>
          {item.title}
        </Link>
      </div>
    );
  }
};

export default SubMenu;
