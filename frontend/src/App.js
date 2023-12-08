import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import {Register} from "./pages/Register.tsx";
import { Login } from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Navbar from "./components/navbar.tsx";
// import Footer from "./components/Footer.tsx";
import "./index.css";
import React, { useState } from 'react';
import NotFound from "./pages/404/NotFound.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { ClientsTable } from "./pages/table.tsx";
import Client from "./pages/client.tsx";
import { Sitting } from "./pages/sitting.tsx";
import { ClientContext } from "./components/clientContext.ts";
const Layout = () => {
   return (
    <>
      
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
   
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
  return (
    <ThemeProvider>
      <ClientContext.Provider value={{ client, setClient }}>
        <RouterProvider router={router} />
      </ClientContext.Provider>
    </ThemeProvider>
  );
}

export default App;
