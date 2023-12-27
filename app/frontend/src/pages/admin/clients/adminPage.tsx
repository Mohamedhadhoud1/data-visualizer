import React from "react";
import { AdminTable } from "./adminTable";

function AdminPage() {
  return (
    <div>
      <p className="text-center text-3xl font-extrabold my-4">All Clients</p>
      <AdminTable />
    </div>
  );
}

export default AdminPage;
