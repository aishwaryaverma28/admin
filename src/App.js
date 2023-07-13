import './index.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Leadplaner from './components/Leadplaner';
import LPleads from './components/LPleads';
import Admin from './components/Admin';
import EmployeeProfile from './components/EmployeeProfile';
import Editor from './components/Editor';
import TimeSheet from "./components/TimeSheet";
import EmployeeDocuments from "./components/EmployeeDocuments";
import SalarySlip from "./components/SalarySlip";
import BlogAdd from "./components/BlogAdd";
import BlogView from "./components/BlogView";
import SitePagesAdd from "./components/SitePagesAdd";
import HelpAdd from "./components/HelpAdd";
import HelpUpdate from "./components/HelpUpdate";
import UserMangAdd from "./components/UserMangAdd";
import UserMangUpdate from "./components/UserMangUpdate";
import EmployeeAdd from "./components/EmployeeAdd";
import EmployeeView from "./components/EmployeeView";
import AccessManagement from "./components/AccessManagement";
import ReportsandAnalytics from "./components/ReportsandAnalytics";
import City from "./components/City";
import State from "./components/State";
import EmployeeUpdate from "./components/EmployeeUpdate";
import BlogUpdate from "./components/BlogUpdate";
import SitePagesView from "./components/SitePagesView";
import SitePagesUpdate from "./components/SitePagesUpdate";
import Home from "./components/Home";
import Contacts from "./components/Contacts";
import Deals from "./components/Deals";
import Mail from './components/Mail';
import LPSetting from './components/LPSetting';
import Login from './components/Login';


const router = createBrowserRouter(
  [
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/lp",
      element: <Leadplaner/>,
      children: [
        {
          path:"/lp/lead",
          element: <LPleads/>,
        },
        {
          path:"/lp/home",
          element:<Home/>,
        },
        {
          path:"/lp/mail",
          element:<Mail/>,
        },
        {
          path:"/lp/contacts",
          element:<Contacts/>,
        },
        {
          path:"/lp/deals",
          element:<Deals/>
        },
        {
          path:"/lp/settings",
          element:<LPSetting/>
        }
      ]
    },
    {
      path: "/admin",
      element: <Admin/>,
      children:[
        {
          path: "/admin",
          element: <Editor />,
        },
        {
          path: "/admin/viewProfile/employeeProfile",
          element: <EmployeeProfile/>,
        },
        {
          path: "/admin/viewProfile/timeSheet",
          element: <TimeSheet />,
        },
        {
          path: "/admin/viewProfile/documents",
          element: <EmployeeDocuments />,
        },
        {
          path: "/admin/viewProfile/salarySlip",
          element: <SalarySlip />,
        },
        {
          path: "/admin/blog/add",
          element: <BlogAdd/>
        },
        {
          path: "/admin/blog/view",
          element: <BlogView />,
        },
        {
          path: "/admin/blog/view/:id",
          element: <BlogUpdate />,
        },
        {
          path: "/admin/sitePages/add",
          element: <SitePagesAdd />,
        },
        {
          path: "/admin/sitePages/view",
          element: <SitePagesView />,
        },
        {
          path: "/admin/sitePages/view/:id",
          element: <SitePagesUpdate/>,
        },
        {
          path: "/admin/helpSection/add",
          element: <HelpAdd />,
        },
        {
          path: "/admin/helpSection/update",
          element: <HelpUpdate />,
        },
        {
          path: "/admin/userManagement/add",
          element: <UserMangAdd />,
        },
        {
          path: "/admin/userManagement/update",
          element: <UserMangUpdate />,
        },
        {
          path: "/admin/employee/add",
          element: <EmployeeAdd />,
        },
        {
          path: "/admin/employee/view",
          element: <EmployeeView />,
        },
        {
          path: "/admin/employee/view/:id",
          element: <EmployeeUpdate />,
        },
        {
          path: "/admin/accessManagement",
          element: <AccessManagement />,
        },
        {
          path: "/admin/reportsAndAnalytics",
          element: <ReportsandAnalytics />,
        },
        {
          path: "/admin/masterSettings/City",
          element: <City />,
        },
        {
          path: "/admin/system/state",
          element: <State />,
        },
      ]
    }
  ]
)
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
