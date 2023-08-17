import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Leadplaner from "./components/Leadplaner";
import LPleads from "./components/LPleads";
import Admin from "./components/Admin";
import EmployeeProfile from "./components/EmployeeProfile";
import Editor from "./components/Editor";
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
import Deal from "./components/deal/Deal";
import Mail from "./components/Mail";
import Login from "./components/Login";
import Registration from "./components/Registration";
import SecurePages from "./components/SecurePages";
import SecureRoutes from "./components/SecureRoutes";
import Testing from "./components/Testing";
import UserAndTeams from "./components/settings/UserAndTeams";
import LPSettingsGeneral from "./components/settings/LPSettingsGeneral";
import Error from "./components/Error";
import LPSettingsNotification from "./components/settings/LPSettingsNotification";
import RecycleBin from "./components/settings/RecycleBin";
import LPPermission from "./components/settings/LPPermission.jsx";
import LPCompanySettings from "./components/settings/LPCompanySettings";
import LPSettings from "./components/settings/LPSettings";
import PrivacyNConsent from "./components/settings/PrivacyNConsent";
import SettingLeads from "./components/settings/SettingLeads";
import SettingDeal from "./components/settings/SettingDeal";
import SettingUsage from "./components/settings/SettingUsage";
import SettingImpExp from "./components/settings/SettingImpExp";
import DealUpdate from "./components/deal/DealUpdate";
const router = createBrowserRouter([
  // {
  //   path: "/:auth",
  //   element: <Testing />,
  //   errorElement:<Error/>,
  // },
  {
    path: "/",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/lp",
    element: <SecurePages Component={Leadplaner} />,
    errorElement: <Error />,
    children: [
      {
        path: "/lp", // This is the new route for /lp
        element: <Navigate to="/lp/home" replace />, // Redirect to /lp/home
      },
      {
        path: "/lp/lead",
        element: <LPleads />,
      },
      {
        path: "/lp/home",
        element: <SecureRoutes Component={Home} />,
      },
      {
        path: "/lp/mail",
        element: <SecureRoutes Component={Mail} />,
      },
      {
        path: "/lp/contacts",
        element: <SecureRoutes Component={Contacts} />,
      },
      {
        path: "/lp/deals",
        element: <SecureRoutes Component={Deal} />,
      },
      {
        path: "/lp/deals/:id",
        element: <DealUpdate/>,
      },
      {
        path: "/lp/settings",
        element: <LPSettings />,
        errorElement: <Error />,
        children: [
          {
            path: "/lp/settings", // This is the new route for /lp
            element: <Navigate to="/lp/settings/general" replace />, // Redirect to /lp/home
          },
          {
            path: "/lp/settings/general",
            element: <SecureRoutes Component={LPSettingsGeneral} />,
          },
          {
            path: "/lp/settings/notification",
            element: <SecureRoutes Component={LPSettingsNotification} />,
          },
          {
            path: "/lp/settings/usernteams",
            element: <SecureRoutes Component={UserAndTeams} />,
          },
          {
            path: "/lp/settings/usernteams/:id",
            element: <LPPermission />,
          },
          {
            path: "/lp/settings/companysettings",
            element: <SecureRoutes Component={LPCompanySettings} />,
          },
          {
            path: "/lp/settings/recyclebin",
            element: <SecureRoutes Component={RecycleBin} />,
          },
          {
            path: "/lp/settings/privacyConcent",
            element: <SecureRoutes Component={PrivacyNConsent} />,
          },
          {
            path: "/lp/settings/settingLeads",
            element: <SecureRoutes Component={SettingLeads} />,
          },
          {
            path: "/lp/settings/settingDeal",
            element: <SecureRoutes Component={SettingDeal} />,
          },
          {
            path: "/lp/settings/settingUsage",
            element: <SecureRoutes Component={SettingUsage} />,
          },
          {
            path: "/lp/settings/settingImpExp",
            element: <SecureRoutes Component={SettingImpExp} />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <SecurePages Component={Admin} />,
    errorElement: <Error />,
    children: [
      {
        path: "/admin",
        element: <SecureRoutes Component={Editor} />,
      },
      {
        path: "/admin/viewProfile/employeeProfile",
        element: <SecureRoutes Component={EmployeeProfile} />,
      },
      {
        path: "/admin/viewProfile/timeSheet",
        element: <SecureRoutes Component={TimeSheet} />,
      },
      {
        path: "/admin/viewProfile/documents",
        element: <SecureRoutes Component={EmployeeDocuments} />,
      },
      {
        path: "/admin/viewProfile/salarySlip",
        element: <SecureRoutes Component={SalarySlip} />,
      },
      {
        path: "/admin/blog/add",
        element: <SecureRoutes Component={BlogAdd} />,
      },
      {
        path: "/admin/blog/view",
        element: <SecureRoutes Component={BlogView} />,
      },
      {
        path: "/admin/blog/view/:id",
        element: <BlogUpdate />,
      },
      {
        path: "/admin/sitePages/add",
        element: <SecureRoutes Component={SitePagesAdd} />,
      },
      {
        path: "/admin/sitePages/view",
        element: <SecureRoutes Component={SitePagesView} />,
      },
      {
        path: "/admin/sitePages/view/:id",
        element: <SitePagesUpdate />,
      },
      {
        path: "/admin/helpSection/add",
        element: <SecureRoutes Component={HelpAdd} />,
      },
      {
        path: "/admin/helpSection/update",
        element: <SecureRoutes Component={HelpUpdate} />,
      },
      {
        path: "/admin/userManagement/add",
        element: <SecureRoutes Component={UserMangAdd} />,
      },
      {
        path: "/admin/userManagement/update",
        element: <SecureRoutes Component={UserMangUpdate} />,
      },
      {
        path: "/admin/employee/add",
        element: <SecureRoutes Component={EmployeeAdd} />,
      },
      {
        path: "/admin/employee/view",
        element: <SecureRoutes Component={EmployeeView} />,
      },
      {
        path: "/admin/employee/view/:id",
        element: <EmployeeUpdate />,
      },
      {
        path: "/admin/accessManagement",
        element: <SecureRoutes Component={AccessManagement} />,
      },
      {
        path: "/admin/reportsAndAnalytics",
        element: <SecureRoutes Component={ReportsandAnalytics} />,
      },
      {
        path: "/admin/masterSettings/City",
        element: <SecureRoutes Component={City} />,
      },
      {
        path: "/admin/system/state",
        element: <SecureRoutes Component={State} />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
