import { createContext } from 'react';
export const ClientContext = createContext({client:{
    Name: "BARILLE Mathilde",
    Mail: "mathilde.barille@gmail.com",
    Montantdevente: "1,635.00 €",
    Formation: "CREATION D'ENTREPRISE",
    Datededebut: "11/10/2023",
     Datedefin: "25/10/2023",
    Formationaffectée: "OUI",
    LIENDIGIFORMA: "https://app.digiforma.com/r/z6Wp59SO",
    Seller: "Marie",
  },setClient:(client:object)=>{}});
