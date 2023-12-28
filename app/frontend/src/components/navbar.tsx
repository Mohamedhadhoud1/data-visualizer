import React, { useContext } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Input } from './ui/input';
import { Search, ChevronDown, Menu } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { SearchContext } from '../context/searchContext';
import { UserContext } from '../context/userContext';

function NavBar() {
  const location = useLocation();
  const { globalFilter, setGlobalFilter } = useContext(SearchContext);
  const { user } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);

   const logOut = async () => {
      await fetch(
       "https://data-visualizer-production.up.railway.app/users/logout",
       {
         method: "POST",
         headers: { "Content-Type": "application/json","Origin":"*" },
         credentials: "include",
       }
     );
   };
  return (
    <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-white py-2 shadow-md shadow-black/5 dark:bg-black dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
      <div className="flex w-full flex-row items-center justify-between px-3 gap-5">
        <div className="flex w-1/2 sm:w-1/3 items-center justify-between">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader className="pb-5">
                <SheetTitle className="font-extrabold">
                  Programme JAK
                </SheetTitle>
              </SheetHeader>
              <Link to="/" onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                    location.pathname === "/"
                      ? "dark:bg-white dark:text-black bg-accent"
                      : null
                  }`}
                >
                  Page d'accueil
                </Button>
              </Link>
              <Link to="/table" onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                    location.pathname === "/table"
                      ? "dark:bg-white dark:text-black bg-accent"
                      : null
                  }`}
                >
                  Tableau de Bord
                </Button>
              </Link>
              <Link to="/clients" onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                    location.pathname === "/clients"
                      ? "dark:bg-white dark:text-black bg-accent"
                      : null
                  }`}
                >
                  Client
                </Button>
              </Link>
              <Link to="/sitting" onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                    location.pathname === "/sitting"
                      ? "dark:bg-white dark:text-black bg-accent"
                      : null
                  }`}
                >
                  Settings
                </Button>
              </Link>
              <Link to="/subSellersData" onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                    location.pathname === "/subSellersData"
                      ? "dark:bg-white dark:text-black bg-accent"
                      : null
                  }`}
                >
                  Code d'affiliation
                </Button>
              </Link>
              {user?.role === "admin" && (
                <>
                  <Link to="/admin" onClick={() => setOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                        location.pathname === "/admin"
                          ? "dark:bg-white dark:text-black bg-accent"
                          : null
                      }`}
                    >
                      Admin Page
                    </Button>
                  </Link>
                  <Link to="/sellers" onClick={() => setOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                        location.pathname === "/sellers"
                          ? "dark:bg-white dark:text-black bg-accent"
                          : null
                      }`}
                    >
                      Sellers
                    </Button>
                  </Link>
                  <Link to="/users" onClick={() => setOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                        location.pathname === "/users"
                          ? "dark:bg-white dark:text-black bg-accent"
                          : null
                      }`}
                    >
                      Users
                    </Button>
                  </Link>
                </>
              )}
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                    location.pathname === "/logout"
                      ? "dark:bg-white dark:text-black bg-accent"
                      : null
                  }`}
                  onClick={logOut}
                >
                  Deconnexion
                </Button>
              </Link>
            </SheetContent>
          </Sheet>

          <Search className="ml-2" />
          <Input
            type="search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="rounded-3xl"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
          />
        </div>
        <div className="flex flex-row justify-end items-center w-1/2 sm:w-1/5">
          <div className="mr-5">
            <ModeToggle />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row-reverse items-center">
              <ChevronDown />{" "}
              <p className="font-bold text-lg"> {user?.firstName}</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/sitting" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/" className="w-full">
                  Page d'accueil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/table" className="w-full">
                  Tableau de Bord
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/clients" className="w-full">
                  Client
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/subSellersData" className="w-full">
                  Code d'affiliation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/login" className="w-full" onClick={logOut}>
                  Deconnexion
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

export default NavBar