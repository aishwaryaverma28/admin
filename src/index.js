import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import Editor from "./components/Editor";
import BlogAdd from './components/BlogAdd';
import BlogView from './components/BlogView';
import SitePagesAdd from './components/SitePagesAdd';
import SitePagesUpdate from './components/SitePagesUpdate';
import SitePagesMetakeywords from './components/SitePagesMetakeywords';
import HelpAdd from './components/HelpAdd';
import HelpUpdate from './components/HelpUpdate';
import UserMangAdd from './components/UserMangAdd';
import UserMangUpdate from './components/UserMangUpdate';
import EmployeeAdd from './components/EmployeeAdd';
import EmployeeView from './components/EmployeeView';
import AccessManagement from './components/AccessManagement';
import ReportsandAnalytics from './components/ReportsandAnalytics';
import City from './components/City';
import State from './components/State';
import EmployeeUpdate from './components/EmployeeUpdate';
import BlogUpdate from './components/BlogUpdate';
const appRouter = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children: [
      {
        path: "/",
        element: <Editor/>
        },
      {
      path: "/blog/add",
      element: <BlogAdd/>
      },
      {
        path: "/blog/view",
        element: <BlogView/>
        },
        {
          path:"/blog/view/:id",
          element:<BlogUpdate/>
        },
        {
          path: "/sitePages/add",
          element: <SitePagesAdd/>
          },
        {
          path: "/sitePages/update",
          element: <SitePagesUpdate/>
        },
        {
          path: "/sitePages/metaKeywords",
          element: <SitePagesMetakeywords/>
        },
        {
          path: "/helpSection/add",
          element: <HelpAdd/>
        },
        {
          path: "/helpSection/update",
          element: <HelpUpdate/>
        },
        {
          path: "/userManagement/add",
          element: <UserMangAdd/>
        },
        {
          path: "/userManagement/update",
          element: <UserMangUpdate/>
        },
        {
          path: "/employee/add",
          element: <EmployeeAdd/>
        },
        {
          path: "/employee/view",
          element: <EmployeeView/>
        },
        {
          path:"/employee/view/:id",
          element:<EmployeeUpdate/>
        },
        {
          path: "/accessManagement",
          element: <AccessManagement/>
        },
        {
          path: "/reportsAndAnalytics",
          element: <ReportsandAnalytics/>
        },
        {
          path: "/masterSettings/City",
          element: <City/>
        },
        {
          path: "/system/state",
          element: <State/>
        }, 
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
   <RouterProvider router={appRouter}/>
  
);
