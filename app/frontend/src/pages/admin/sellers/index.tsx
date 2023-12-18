import React, { useState } from "react";
import { SellersTable } from "./sellersTable";
import { EditSeller } from "./editSeller";
import {Seller} from "../../../interface/seller";

function Sellers() {
    const [seller, setSeller] = useState<Seller | undefined>();
  return (
    <div>
      <SellersTable setSeller={setSeller} seller={seller}/>
      <EditSeller seller={seller}/>
    </div>
  );
}

export default Sellers;
