import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Leadplaner from "./components/Leadplaner";
import EmployeeProfile from "./components/master-settings/EmployeeProfile";
import Editor from "./components/Editor";
import BlogAdd from "./components/master-settings/BlogAdd.jsx";
import BlogView from "./components/master-settings/BlogView";
import SitePagesAdd from "./components/master-settings/SitePagesAdd";
import HelpAdd from "./components/master-settings/HelpAdd";
import HelpUpdate from "./components/master-settings/HelpUpdate";
import EmployeeAdd from "./components/master-settings/EmployeeAdd";
import EmployeeView from "./components/EmployeeView";
import EmployeeUpdate from "./components/master-settings/EmployeeUpdate";
import BlogUpdate from "./components/master-settings/BlogUpdate";
import SitePagesView from "./components/master-settings/SitePagesView";
import SitePagesUpdate from "./components/master-settings/SitePagesUpdate";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import SecureRoutes from "./components/SecureRoutes";
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
import WorkFlow from "./components/settings/PipelineWorkflow/EditWorkflow";
import SettingUsage from "./components/settings/SettingUsage";
import SettingImpExp from "./components/settings/SettingImpExp";
import DealUpdate from "./components/deal/DealUpdate";
import HelpView from "./components/master-settings/HelpView";
import Reset from "./components/Reset";
import BmpReviewsView from "./components/master-settings/bmp/BmpReviewsView.jsx";
import BmpReviewsUpdate from "./components/master-settings/bmp/BmpReviewsUpdate.jsx";
import AddTournament from "./components/master-settings/tournament/AddTournament.jsx";
import ViewTournament from "./components/master-settings/tournament/ViewTournament.jsx";
import UpdateTournament from "./components/master-settings/tournament/UpdateTournament.jsx";
import AddLeadPage from "./components/master-settings/leads/AddLeadPage.jsx";
import ViewLeadsPage from "./components/master-settings/leads/ViewLeadsPage.jsx";
import BacklistTable from "./components/master-settings/backlist/BacklistTable.jsx";
import Acadmey from "./components/acadmey/Acadmey.jsx";
import Coach from "./components/coach/Coach.jsx";
import BmpLeads from "./components/bmpleads/BmpLeads.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Player from "./components/player/Player.jsx";
import TicketTabs from "./components/academytickets/TicketTabs.jsx";
import Procedure from "./components/procedure/Procedure.jsx";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/lp",
    element: <Leadplaner />,
    errorElement: <Error />,
    children: [
      {
        path: "/lp",
        element: <Navigate to="/lp/home" replace />,
      },
      {
        path: "/lp/lead",
        element: <SecureRoutes Component={Dashboard} />,
      },
      {
        path: "/lp/bmp",
        element: <SecureRoutes Component={Acadmey} />,
      },
      {
        path: "/lp/coach",
        element: <SecureRoutes Component={Coach} />,
      },
      {
        path: "/lp/player",
        element: <Player/>,
      },
      {
        path: "/lp/home",
        element: <SecureRoutes Component={Home} />,
      },
      {
        path: "/lp/admin",
        element: <SecureRoutes Component={Editor} />,
      },
      {
        path: "/lp/deals",
        element: <SecureRoutes Component={BmpLeads} />,
      },
      {
        path: "/lp/deals/:id",
        element: <DealUpdate />,
      },
      {
        path: "/lp/support",
        element: <TicketTabs/>,
      },
      {
        path: "/lp/procedure",
        element: <Procedure/>,
      },
      {
        path: "/lp/settings",
        element: <LPSettings />,
        errorElement: <Error />,
        children: [
          {
            path: "/lp/settings",
            element: <Navigate to="/lp/settings/general" replace />,
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
            path: "/lp/settings/workflow",
            element: <SecureRoutes Component={WorkFlow} />,
          },
          {
            path: "/lp/settings/settingUsage",
            element: <SecureRoutes Component={SettingUsage} />,
          },
          {
            path: "/lp/settings/settingImpExp",
            element: <SecureRoutes Component={SettingImpExp} />,
          },
          {
            path: "/lp/settings/viewProfile/employeeProfile",
            element: <SecureRoutes Component={EmployeeProfile} />,
          },
          {
            path: "/lp/settings/blog/add",
            element: <SecureRoutes Component={BlogAdd} />,
          },
          {
            path: "/lp/settings/blog/view",
            element: <SecureRoutes Component={BlogView} />,
          },
          {
            path: "/lp/settings/blog/view/:id",
            element: <BlogUpdate />,
          },
          {
            path: "/lp/settings/backlist/view",
            element: <BacklistTable/>,
          },
          {
            path: "/lp/settings/tournament/add",
            element: <SecureRoutes Component={AddTournament}/>,
          },
          {
            path: "/lp/settings/tournament/view",
            element: <SecureRoutes Component={ViewTournament}/>,
          },
          {
            path: "/lp/settings/leads/add",
            element: <AddLeadPage />,
          },
          {
            path: "/lp/settings/leads/view",
            element: <ViewLeadsPage />,
          },
          {
            path: "/lp/settings/blog/tournament/:id",
            element: <UpdateTournament />,
          },

          {
            path: "/lp/settings/review/view",
            element: <SecureRoutes Component={BmpReviewsView} />,
          },
          {
            path: "/lp/settings/review/view/:id",
            element: <BmpReviewsUpdate />,
          },
          {
            path: "/lp/settings/sitePages/add",
            element: <SecureRoutes Component={SitePagesAdd} />,
          },
          {
            path: "/lp/settings/sitePages/view",
            element: <SecureRoutes Component={SitePagesView} />,
          },
          {
            path: "/lp/settings/sitePages/view/:id",
            element: <SitePagesUpdate />,
          },
          {
            path: "/lp/settings/helpSection/add",
            element: <SecureRoutes Component={HelpAdd} />,
          },
          {
            path: "/lp/settings/helpSection/update",
            element: <SecureRoutes Component={HelpView} />,
          },
          {
            path: "/lp/settings/helpSection/update/:id",
            element: <HelpUpdate />,
          },
          {
            path: "/lp/settings/employee/add",
            element: <SecureRoutes Component={EmployeeAdd} />,
          },
          {
            path: "/lp/settings/employee/view",
            element: <SecureRoutes Component={EmployeeView} />,
          },
          {
            path: "/lp/settings/employee/view/:id",
            element: <EmployeeUpdate />,
          },
        ],
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
