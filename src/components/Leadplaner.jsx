import React from 'react'
import { Outlet } from 'react-router-dom'
import LPheader from './LPheader'
import { LPUserProvider } from './LPContext';
import { Provider } from 'react-redux';
import store from './utils/store';
import BmpHeader from './BmpHeader';
export default function Leadplaner() {
  const landingUrl = localStorage.getItem("landingUrl");
  return (
    <div>
      <Provider store={store}>
        <LPUserProvider>
          {(landingUrl === "/lp/bmp/overview" || landingUrl === '/lp/bmp/admin') ? (
            <BmpHeader />
          ) : (<LPheader />)}
          <Outlet />
        </LPUserProvider>
      </Provider>
    </div>
  )
}
