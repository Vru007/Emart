import React from "react";
import { Navbar } from "../features/navbar/navbar";
// import ProductDetail from "../features/product-list/components/productDetail";
import UserProfile from "../features/user/components/UserProfile";
function UserProfilePage(){
 
    return(
        <div>
       <Navbar>
       <UserProfile></UserProfile>
       </Navbar>
       </div>
    )
}

export default UserProfilePage;
