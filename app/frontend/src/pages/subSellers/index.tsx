import React, { useContext, useEffect, useState } from "react";
import { ClientData } from "@/interface/ClientData";
import { SubSellersDataTable } from "./subSellersDataTable";
import { toast } from "../../components/ui/use-toast";
import { UserContext } from "../../context/userContext";
type MyGroupType = {
  [key: string]: ClientData;
};
function SubSellersData() {
    const [data, setData] = useState<MyGroupType[]|undefined>();
    const {user} = useContext(UserContext);
    useEffect(()=>{
         const fetchData = async () => {
           const response = await fetch(
             `https://data-visualizer-production.up.railway.app/data/subInd/${user?.userName}`,
             {
               method: "GET",
               headers: { "Content-Type": "application/json", "Origin": "*" },
             }
           );

           const content = await response.json();
           if (content) {
             setData(content);
           }
         };
         fetchData();
    },[])
  return (
    <div>
      {data ?(
        data.map((group, index) => {
          console.log(group);
          return (
            <div className="my-8">
              <p className="text-center text-3xl font-extrabold">{Object.keys(group)[1]}</p>
              {//@ts-ignore
              <SubSellersDataTable key={index} data={Object.values(group)[0]} />
              }</div>
          );})):<p className="font-extrabold text-3xl text-red-500 text-center my-20">There's NO Sub Clients</p>}
    </div>
  );
}

export default SubSellersData;
