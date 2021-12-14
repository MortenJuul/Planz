import { Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import MainLayout from "./components/MainLayout";
import Account from "./pages/Account";
import CustomerList from "./pages/CustomerList";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Planner from "./pages/Planner";
import Landing from "./pages/Landing";

const routes = (user) => {
  return [
    {
      path: "app",
      element: <DashboardLayout />,
      children: [
        { path: "planner", element: <Planner /> },
        { path: "account", element: <Account /> },
        { path: "customers", element: <CustomerList /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "products", element: <ProductList /> },
        { path: "settings", element: <Settings /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: user ? <Register /> : <Login />},
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Landing /> },
        // { path: '/', element: <Navigate to="/welcome" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
  ];
};

export default routes;