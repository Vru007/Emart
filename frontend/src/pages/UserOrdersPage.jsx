import React from "react";
import { Login } from "../features/auth/components/login";
import {AllOrders} from "../features/user/components/UserOrders";
import { Navbar } from "../features/navbar/navbar";
export default function UserOrderPage(){
    return(
        <div>
        <Navbar>
           <AllOrders/>
        </Navbar>
        </div>
    )
}

