import React from "react";
import {ProductList} from "../features/product-list/components/productList"
import { Navbar } from "../features/navbar/navbar";
function homePage(){
 
    return(
        <div>
       <Navbar>
       <ProductList/>
       </Navbar>
       </div>
    )
}

export default homePage;
