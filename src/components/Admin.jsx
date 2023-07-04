import React, { useState } from 'react';
import './styles/Sidebar.css';
import './styles/Admin.css';
import NavigationBar from './Navigationbar';
import { UserProvider } from './UserContext';
import { Outlet } from 'react-router-dom';

function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`main ${isSidebarOpen ? 'open' : ''}`}>
      <UserProvider>
        <div className={`sidebar ${isSidebarOpen ? 'sidebarOpen' : ''}`}>
          <NavigationBar />
        </div>
        <div className="container">
          <Outlet />
        </div>
        <div className="hamburger" onClick={handleSidebarToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </UserProvider>
    </div>
  );
}

export default Admin;