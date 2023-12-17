import { ClientContext } from "../context/clientContext";
import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

function Client() {
  const { client } = useContext(ClientContext);
  return (
    <>
      {client ? (
        <>
          <div className="mx-auto my-20 text-center text-3xl font-extrabold">
            <p>{client?.name}</p>
          </div>
          <div className="flex flex-wrap flex-shrink-0 gap-10 m-5 mb-20 sm:flex-row flex-col">
            <Card className="text-center sm:w-[calc(50%-1.5rem)]">
              <CardHeader>
                <CardTitle>Mail</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{client?.mail}</p>
              </CardContent>
            </Card>
            <Card className="text-center sm:w-[calc(50%-1.5rem)]">
              <CardHeader>
                <CardTitle>Montant de vente</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{client?.salesAmount}</p>
              </CardContent>
            </Card>
            <Card className="text-center sm:w-[calc(50%-1.5rem)]">
              <CardHeader>
                <CardTitle>Formation</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{client?.course}</p>
              </CardContent>
            </Card>
            <Card className="text-center sm:w-1/2 sm:w-[calc(50%-1.5rem)]">
              <CardHeader>
                <CardTitle>Formation affectée</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{client?.courseAcivated}</p>
              </CardContent>
            </Card>
            <Card className="text-center sm:w-[calc(50%-1.5rem)]">
              <CardHeader>
                <CardTitle>Date de debut</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{client?.dateStartCourse}</p>
              </CardContent>
            </Card>
            <Card className="text-center sm:w-[calc(50%-1.5rem)]">
              <CardHeader>
                <CardTitle>Date de fin</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{client?.dateEndCourse}</p>
              </CardContent>
            </Card>
            <Card className="text-center w-full">
              <CardHeader>
                <CardTitle>LIEN DIGIFORMA</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{client?.courseLink}</p>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div className="mx-auto my-20 text-center text-3xl font-extrabold">
          <p>Veuillez sélectionner un client pour afficher ses données</p>
        </div>
      )}
    </>
  );
}

export default Client;
