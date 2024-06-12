import React from "react";
import { AdminProductList } from "../features/admin/components/AdminProduct";
import { Navbar } from "../features/navbar/navbar";

export default function AdminProductListPage(){
    return (
          <>
          <Navbar>
           <AdminProductList/>
           </Navbar>
          </>
    )
}