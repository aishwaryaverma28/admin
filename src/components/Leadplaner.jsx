import React from 'react'
import { Outlet } from 'react-router-dom'
import LPheader from './LPheader'
import { LPUserProvider } from './LPContext';

export default function Leadplaner() {
  return (
    <div>
      <LPUserProvider>
     <LPheader/>
     <Outlet/>
     </LPUserProvider>
    </div>
  )
}
