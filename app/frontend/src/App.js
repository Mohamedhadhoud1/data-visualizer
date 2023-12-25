import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
} from "react-router-dom";
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
import AdminPage from "./pages/admin/clients/adminPage.tsx";
import Client from "./pages/client.tsx";
import { Sitting } from "./pages/sitting.tsx";
import FileUpload from "./pages/fileupload.tsx";
import { ClientContext } from "./context/clientContext.ts";
import { SearchContext } from "./context/searchContext.ts";
import { UserContext } from "./context/userContext.ts";
import { Toaster } from "./components/ui/toaster.tsx";
import { AddClient } from "./pages/admin/clients/addClient.tsx";
import { EditClient } from "./pages/admin/clients/editClient.tsx";
import { SellersTable } from "./pages/admin/sellers/sellersTable.tsx";
import { AddSeller } from "./pages/admin/sellers/addSeller.tsx";
import { EditSeller } from "./pages/admin/sellers/editSeller.tsx";
import {Seller} from "./interface/seller.ts"
import { UsersTable } from "./pages/admin/users/usersTable.tsx";
import SubSellersData from "./pages/subSellers/index";
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
  const { user, setUser } = useContext(UserContext);
  
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "https://data-visualizer-production.up.railway.app/users/user",
        {
          method: "GET",
          headers: { "Content-Type": "application/json"},
          credentials: "include",
        }
      );
      const content = await response.json();
      if (content.firstName) {
        setUser(content);
        console.log(content);
      }else if(content.role==="admin"){
        navigate('/admin')
      } else {
        setUser({});
        navigate("/login");
      }
    };
    fetchUser();
},[user?.id])
return children;
}

const Adminroute = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  
  console.log(user,'user')
  useEffect(()=>{
 if (user && user?.role != "admin") {
   navigate("/");
 }
  },[user?.role])
  return children;
};
function App() {
  const [client, setClient] = useState();
  const [user, setUser] = useState();
  const [globalFilter, setGlobalFilter] = useState();
  const [seller, setSeller] = useState([]);
 
useEffect(() => {
  const fetchUser = async () => {
    const response = await fetch(
      "https://data-visualizer-production.up.railway.app/users/user",
      {
        method: "GET",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
      }
    );
    const content = await response.json();
    if (content.firstName) {
      setUser(content);
      console.log(content);
    }
  };
  fetchUser();
}, [user?.id]);

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
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/table",
        element: (
          <PrivateRoute>
            <ClientsTable />
          </PrivateRoute>
        ),
      },
      {
        path: "/clients",
        element: (
          <PrivateRoute>
            {" "}
            <Client />
          </PrivateRoute>
        ),
      },
      {
        path: "/subSellersData",
        element: (
          <PrivateRoute>
            <SubSellersData />
          </PrivateRoute>
        ),
      },
      {
        path: "/sitting",
        element: (
          <PrivateRoute>
            <Sitting />
          </PrivateRoute>
        ),
      },
      {
        path: "/file",
        element: (
          // <Adminroute>
            <FileUpload />
          // </Adminroute>
        ),
      },
      {
        path: "/admin",
        element: (
          <Adminroute>
            <AdminPage />
          </Adminroute>
        ),
      },
      {
        path: "/addClient",
        element: (
          <Adminroute>
            {" "}
            <AddClient />
          </Adminroute>
        ),
      },
      {
        path: "/editClient",
        element: (
          <Adminroute>
            {" "}
            <EditClient />
          </Adminroute>
        ),
      },
      {
        path: "/sellers",
        element: (
          <Adminroute>
            {" "}
            <SellersTable setSeller={setSeller} seller={seller} />
          </Adminroute>
        ),
      },
      {
        path: "/addSeller",
        element: (
          <Adminroute>
            {" "}
            <AddSeller />
          </Adminroute>
        ),
      },
      {
        path: "/editSeller",
        element: (
          <Adminroute>
            {" "}
            <EditSeller seller={seller} />
          </Adminroute>
        ),
      },
      {
        path: "/users",
        element: (
          <Adminroute>
            <UsersTable />
          </Adminroute>
        ),
      },
    ],
    errorElement: (
      <Adminroute>
        {" "}
        <NotFound />
      </Adminroute>
    ),
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
