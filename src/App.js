import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Navbar from "./components/navbar.tsx";
// import Footer from "./components/Footer.tsx";
import "./index.css";
import React from 'react';
import NotFound from "./pages/NotFound.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";


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
 
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
