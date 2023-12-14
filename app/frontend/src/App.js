import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from "react-router-dom";
import { Register } from "./pages/Register.tsx";
import { Login } from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Navbar from "./components/navbar.tsx";
// import Footer from "./components/Footer.tsx";
import "./index.css";
import React, { useContext, useEffect, useState } from "react";
import NotFound from "./pages/404/NotFound.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { ClientsTable } from "./pages/table.tsx";
import Client from "./pages/client.tsx";
import { Sitting } from "./pages/sitting.tsx";
import FileUpload from "./pages/fileupload.tsx";
import { ClientContext } from "./context/clientContext.ts";
import { SearchContext } from "./context/searchContext.ts";
import { UserContext } from "./context/userContext.ts";
import { Toaster } from "./components/ui/toaster.tsx";
import Cookies from "js-cookie";
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster />
      {/* <Footer /> */}
    </>
  );
};
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
   const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate("/login");
    }
  }, [user, navigate]);

  return children;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/table",
        element: <ClientsTable />,
      },
      {
        path: "/clients",
        element: <Client />,
      },
      {
        path: "/sitting",
        element: <Sitting />,
      },
      {
        path: "/file",
        element: <FileUpload />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const [client, setClient] = useState();
  const [user, setUser] = useState();
  const [globalFilter, setGlobalFilter] = useState();
  return (
    <ThemeProvider>
      <ClientContext.Provider value={{ client, setClient }}>
        <SearchContext.Provider value={{ globalFilter, setGlobalFilter }}>
          <UserContext.Provider value={{ user, setUser }}>
            <RouterProvider router={router} />
          </UserContext.Provider>
        </SearchContext.Provider>
      </ClientContext.Provider>
    </ThemeProvider>
  );
}

export default App;
