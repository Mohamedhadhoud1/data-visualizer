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
           console.log("jjj");
           const response = await fetch(
             `https://data-visualizer-production.up.railway.app/data/subInd/${user.userName}`,
             {
               method: "GET",
               headers: { "Content-Type": "application/json", "Origin": "*" },
             }
           );

           const content = await response.json();
           console.log(content, "kkk");
           if (content) {
             console.log(content, "kkk");
             setData(content);
             toast({
               title: "Data Fetched Successfully",
               variant: "success",
             });
           }
         };
         fetchData();
    },[])
  return (
    <div>
      {data ?(
        data.map((group, index) => {
          console.log(Object.keys(group)[0]);
          
          return (
            <div className="my-8">
              <p className="text-center text-3xl font-extrabold">{Object.keys(group)[0]}</p>
              {//@ts-ignore
              <SubSellersDataTable key={index} data={Object.values(group)[0]} />
              }</div>
          );})):<p className="font-extrabold text-3xl text-red-500 text-center my-20">There's NO Sub Clients</p>}
    </div>
  );
}

export default SubSellersData;
