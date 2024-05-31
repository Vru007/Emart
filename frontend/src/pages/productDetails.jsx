import React from "react";
import { Navbar } from "../features/navbar/navbar";
import ProductDetail from "../features/product-list/components/productDetail";
function ProductDetailPage(){
 
    return(
        <div>
       <Navbar>
       <ProductDetail/>
       </Navbar>
       </div>
    )
}

export default ProductDetailPage;
