import React, { useContext } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Button } from "../components/ui/button";

import { Euro, UsersRound } from "lucide-react";
import { DataTable } from "./Table/homeTable";
import { ClientContext } from "../context/clientContext";

const Home = () => {
  const { client } = useContext(ClientContext);
  console.log(client, "bla");
  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between sm:justify-around gap-4 sm:mx-2 my-10 mx-2 items-center">
        <Card className="sm:w-1/4 h-max w-4/5 ">
          <CardContent className="flex flex-row items-center justify-between w-full p-3">
            <div>
              <p className="font-extrabold text-3xl">45</p>
              <p>Clients</p>
            </div>
            <Button className="h-min cursor-default pointer-events-none">
              <UsersRound size="48px" />
            </Button>
          </CardContent>
        </Card>
        <Card className="sm:w-1/4 h-max w-4/5">
          <CardContent className="flex flex-row items-center justify-between w-full p-3">
            <div>
              <p className="font-extrabold text-3xl">{client?.salesAmount}</p>
              <p>Clients</p>
            </div>
            <Button className="h-min cursor-default pointer-events-none">
              <Euro size="48px" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="sm:w-1/2 w-4/5 mx-auto mb-10">
        <CardHeader>
          <CardTitle>Statut Client</CardTitle>
        </CardHeader>
        <CardContent className=" block w-full">
          <p className="text-3xl mx-auto text-center p-10 font-extrabold">
            {client?.name}
          </p>
        </CardContent>
        <CardFooter className="sm:flex-row flex-col gap-2">
          <div className="flex flex-col w-4/5 sm:w-1/3">
            <p className="text-center">Nom de la Formation </p>
            <Button className="cursor-default  sm:mt-2 sm:mb-0 mb-3 pointer-events-none">
              {client?.course}
            </Button>
          </div>
          <div className="flex flex-col w-4/5 sm:w-1/3">
            <p className="text-center ">Montant formation </p>
            <Button className="cursor-default text-lg sm:mt-2 sm:mb-0 mb-3 pointer-events-none">
              {client?.salesAmount}
            </Button>
          </div>
          <div className="flex flex-col w-4/5 sm:w-1/3">
            <p className="text-center"> Formation affectée </p>
            <Button className="cursor-default text-lg sm:mt-2 sm:mb-0 mb-3 pointer-events-none">
              {client?.courseAcivated}
            </Button>
          </div>
        </CardFooter>
      </Card>
      <DataTable />
    </>
  );
};

export default Home;
