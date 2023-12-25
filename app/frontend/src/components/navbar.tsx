import React, { useContext, useEffect } from 'react'
import { Avatar } from './ui/avatar'
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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Input } from './ui/input';
import { BellDot, Search, ChevronDown, Menu } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { SearchContext } from '../context/searchContext';
import { UserContext } from '../context/userContext';

function NavBar() {
  const location = useLocation();
  console.log(location.pathname)
  const { globalFilter, setGlobalFilter } = useContext(SearchContext);
  const { user, setUser } = useContext(UserContext);
 

   const logOut = async () => {
     const response = await fetch(
       "https://data-visualizer-production.up.railway.app/users/logout",
       {
         method: "POST",
         mode:"no-cors",
         headers: { "Content-Type": "application/json", Origin: "*" },
         credentials: "include",
       }
     );
   };
  return (
    <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-white py-2 shadow-md shadow-black/5 dark:bg-black dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
      <div className="flex w-full flex-row items-center justify-between px-3 gap-5">
        <div className="flex w-1/2 sm:w-1/3 items-center justify-between">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader className="pb-5">
                <SheetTitle className="font-extrabold">
                  Programme JAK
                </SheetTitle>
              </SheetHeader>
              <Link to="/">
                <Button
                  variant="ghost"
                  className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                    location.pathname == "/"
                      ? "dark:bg-white dark:text-black bg-accent"
                      : null
                  }`}
                >
                  Page d'accueil
                </Button>
              </Link>
              <Link to="/table">
                <Button
                  variant="ghost"
                  className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                    location.pathname == "/table"
                      ? "dark:bg-white dark:text-black bg-accent"
                      : null
                  }`}
                >
                  Tableau de Bord
                </Button>
              </Link>
              <Link to="/clients">
                <Button
                  variant="ghost"
                  className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                    location.pathname == "/clients"
                      ? "dark:bg-white dark:text-black bg-accent"
                      : null
                  }`}
                >
                  Client
                </Button>
              </Link>
              <Link to="/sitting">
                <Button
                  variant="ghost"
                  className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                    location.pathname == "/sitting"
                      ? "dark:bg-white dark:text-black bg-accent"
                      : null
                  }`}
                >
                  Settings
                </Button>
              </Link>
              <Link to="/subSellersData">
                <Button
                  variant="ghost"
                  className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                    location.pathname == "/subSellersData"
                      ? "dark:bg-white dark:text-black bg-accent"
                      : null
                  }`}
                >
                  code affectée
                </Button>
              </Link>
             {user?.role=="admin" && (<><Link to="/admin">
                <Button
                  variant="ghost"
                  className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                    location.pathname == "/admin"
                      ? "dark:bg-white dark:text-black bg-accent"
                      : null
                  }`}
                >
                  Admin Page
                </Button>
              </Link>
              <Link to="/sellers">
                <Button
                  variant="ghost"
                  className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                    location.pathname == "/sellers"
                      ? "dark:bg-white dark:text-black bg-accent"
                      : null
                  }`}
                >
                  Sellers
                </Button>
              </Link>
              <Link to="/users">
                <Button
                  variant="ghost"
                  className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                    location.pathname == "/users"
                      ? "dark:bg-white dark:text-black bg-accent"
                      : null
                  }`}
                >
                  Users
                </Button>
              </Link>
              </>)}
              <Link to="/login">
                <Button
                  variant="ghost"
                  className={`w-full my-2 dark:hover:bg-white dark:hover:text-black ${
                    location.pathname == "/logout"
                      ? "dark:bg-white dark:text-black bg-accent"
                      : null
                  }`}
                  onClick={logOut}
                >
                  Log Out
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
          {/* <BellDot />

          <Avatar>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEUAAAD///8mJibFxcU5OTmYmJimpqbIyMj8/Px4eHjx8fG6urqsrKzl5eXs7Ozz8/Ph4eHR0dGOjo7Nzc0yMjJzc3OLi4tmZmagoKC7u7tKSkptbW1PT09kZGQ/Pz9WVlYZGRkQEBApKSkcHByCgoI0NDRcXFxDQ0NYAjDbAAAJHklEQVR4nO2caVviMBDHG5G7UE4BWUVW1O//DbfkmEmag7qh7jP7zP+VIQf5NZPMJCkWxX+uh3/dgc7FhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhPTFhLf1201urL/Pjbx/ojuM4c5J/Xq0Ek/5rWfrDoQrNzmw/t7185vP1R0IPwZOsn+0ErN/b6f3WGnWLsbc+vtpcYf28xQjvKyHtXqga2r4Fi67WzvJnm2aIj0VN5EmQ3odr8qD7MxhWvYv4+d2dWOE/WpSSxiN5tfke6Rw9WynvsQZE1ORtJLytVUvi+10JnyNZr3+6VbV5Pc/QFu9ZCP9mZOcWaVfRdJOxeetDta6LFUnlvuteiCPu8t0AX1bPp1TtZOEjy0JC7F1eiSsB7sQq2Zpu+Qxnqn0Xo5kDxaXZs6xB907bEJVle5D2KucpLDG9CJEfD2d3ZimtRmr758Fx/qtNP2bh7KV7kN4Eo7jK+2Oj+J2+iLEIJYnNdZfHzWDh+UPERZze3WpJ5/ARBnvYN29aarVtfry6jFRZvBDhCtxsJMLK/lRVw9Pk490w6+VttBbX/0jhIUQ9rpfTz50IPVIhe10KmI5V32KVoBqqnZIaNbCg9vXkdWxY10/GJ8mH/6L/uYqVgA165Rwqeffs3A8Rv1ccXWvwnbaTwH8Mt/cIiT46pRwZlaRmZi4NUeQ2IetUUVM4WbfzBe32n8NuySsTNsX1xQX1jIpu+vZqfYE4Q6YGG2Z6h7o1CWhEC/wlz0e2zr5ZRJy1W8u+Trsei4CAk+eiFVsTSbxvHxCs7GYus5tZFnmLrAmmom2LXw9m69NektLq0M8L5PwLCAo+3KXheswjE1i4tvpULfshZsFDG/MhL+nTMJriRL7ZU2bjbAWG7lsOnYK25aAH9netJzvKJPwZHHUa429VVha8GpptO0UZlrAEGEr+KstRUqZhC+2odVTz5rxW3vY1EZnj7mjeMvG19+OZlopk3Br96R0je4KYcxWryswTz+gZd8fLE3W3sv6G2USyrDXbNSvU8/yGDLqN0vlXBYEtwUe3fdkvyHr43soEWUS7mXuUKcWzrySXTVR2aoxLJVp2Qvb+lH2v1MmoV4w9BHV2LFEZW5mi6sbMlHA3LQ8KhoCV9HWGd5QJuFUZRuMyplYR5m3cUqaOYsHSY2w5QwZIU/5F8okXLsDIYcU7zGkKWpiE6foh4GnSI2w7QgZLQ8abymT0AyFft5yrUGPoWbp0S2q7HQKTb+4LYKjjOw6vq1MQuOcTQgqpx54DLVi6rXkoouqBQTWk+b+CMz3XvcBmYRwKq7Dj6Nts8aI9QJqnLy00ws03QjbIBQYFvdRJqFXQE49WAV3KlMttcb+pIvE6VZGWkyfM7bXvQjNrFFTDxYJNcZqg6XjGGW0r1DRHatP+PxeV495hGePUO0ZwGMoYL2aLOyeQ0U3bBvD5+PiPsojxAIQmqwtJNgkqdVlbD8KqOnG1yv4vM2dTRvlEaJNwcr3YiEV4DDVwF0nqZmjsEa5QQ06i7tsnYpcQtirWram4jFzBGeewds1cY3FzX4KgxqnRfSTX8Ut9d1bXHmJW3ql8ggvgQJ9d2QmVv5v60nAHskEtd8n7IlRLaggU74XzSPEWYPP7s39wLj2k8KCCAZRnLDt8A1CKZwokfufPMIBFLDWdn3GpHd3Z11AzsxjFajqhG1IGDxm9LULdcFWHiEOhBV76adq7NHE2PIRowvA4R+HW7x5Qa/UMSHuEOzbar3308s9mJF7234M92wabDGhjglxubDX9pVllwVudt02TlDVWf7QWySu/211TIivgNhnoWf9mbZc2EY4Hg7Popzz6if4uOU5VMeE+MKN0442Xu0xDHAjeoGqTtiGHrblcXDHhHCe5AYmxgK1/cFsdQ4soG0HHCPylvvDjgnB3TZOzIz1qisNA7wOlhHuvRF8Zcs9Pg56F4TvkN84+TOzSTPptcaNNHGVcj7Gqd3OIeJmpAvCDeQ3T67N58pjrEJmN4TKzsdBF5tQt4Rf0XzTTz3H5N8NB4d+wbk7xR63O8bolhDuULzTW7jjVANxjcWaR9h4FuW8Rn2Gj72z4qC6JcSthee8Zk43rxczzQNerOzu5nF+torbuiVE9+zNGei/8hgzf0RimwIkb3Ws3y0hGpp/qAKORHqMJ3+U0fOVkZqtzLRbQlws/EMVWBOVxxDeW674em7jNQNsNfQWQ1PdEuLWwr/qwyGS9IFzJRgrNxKw7hbbhDXdEq4hP/AeMhzExC6rq1iBlGl46pYwEpYo4YoRuSaDR+C97gOj22IQuyWMhJbNfkZWjGE0H2PNXaiio24JgSFoiGhs/hHfVRifeb9ygAmeeJtL64cIg9aEtcPvNu0h23/LGS7Bww/HUreEkB0OIWGaht85wInqBy/oSl4CNW11SojvhYSjD5hO4V0CzrbAJQwG9bEf6mh1Soi9iNiS9geRlQai8+ChE+TemIrRq1ajHMJTsosFnPpGzpRw/xwssDH+Mv3yF87mDgjxiCQSXmmGWPNQPfJ2qJnH81QnMa7qgBANJOa2lgkTtoKadaQAnIsnlhvoQ8xUcghxaxE7UpEH29GfPUHAEA1dHkxcGN1IoVNdRC4ccwhxCrzFWqhS557gTRK/qTjp2G4UnurmIqcaRH85lEPY4uWefeqW7HC7fq1nc77s/RrzdaBCjkmZOg1IEm7ShL3bPXxP/Z5g0IqwwJ9YTqZPv+Sp8vl11x/KaTxa9lO/+yrihGiBlsD5nkeB3OA8WIYXoXmgfvL08HO/rJoVFodVizPVGOGuHPjCXWAgswy+8Bqx0b7ffHlzM3h+3j3tZdn9antq+VMM/r8Y/4GYkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL6YkL4eiof/XI9/ALVJU38w2771AAAAAElFTkSuQmCC"
              alt="client"
            />
          </Avatar> */}
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
                  code affectée
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/login" className="w-full" onClick={logOut}>
                  Log Out
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