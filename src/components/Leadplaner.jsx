import React from 'react'
import { Outlet } from 'react-router-dom'
import LPheader from './LPheader'

export default function Leadplaner() {
  return (
    <div>
     <LPheader/>
     <Outlet/>
    </div>
  )
}
