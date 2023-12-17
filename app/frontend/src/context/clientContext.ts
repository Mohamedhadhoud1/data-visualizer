import { createContext } from 'react';
export const ClientContext = createContext({client:{
    id:"",
    folderNumber: "N° 39412668451",
      salesAmount: "3,200.00 €",
      seller: "Amine",
      name:"BACHIR Ridwane",
      mail:"Ridwane69310@icloud.com",
      course: "CREATION D'ENTREPRISE",
      dateStartCourse: "11/10/2023",
      dateEndCourse: "25/10/2023",
      courseAcivated: "OUI",
      courseLink: "https://app.digiforma.com/r/80Lislhu",
      courseCode: "test",
  },setClient:(client:object)=>{}});
