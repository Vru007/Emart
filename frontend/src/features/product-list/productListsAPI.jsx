// A mock function to mimic making an async request for data
import axios from'axios';
export function fetchAllProducts() {
   
  return new Promise(async (resolve)=>{
    const response=await axios.get('http://localhost:8080/products');
    const data=await response.data;
    // console.log("products from backend: ",data)
    resolve({data});
  })
}
export function fetchAllCategories() {
   
  return new Promise(async (resolve)=>{
    const response=await axios.get('http://localhost:8080/category');
    const data=await response.data;
    resolve({data});
  })
}
export function fetchAllBrands() {
   
  return new Promise(async (resolve)=>{
    const response=await axios.get('http://localhost:8080/brand', );
    const data=await response.data;
    resolve({data});
  })
}
 
export function fetchProductsByFilters(filter,sort,pagination) {
  //filter={"category":["laptops","samrtphones"]}
  //sort={_sort:"price",_order:"desc"}
  //pagination={_page:1,_limit=10};
  let string='';
  for(let key in filter){
    const categoryValues=filter[key];
    if(categoryValues.length>0){
    const lastcategoryvalue=categoryValues[categoryValues.length-1];
    string+=`${key}=${lastcategoryvalue}&`;
    }
  }

    for(let key in sort){
      
      string+=`${key}=${sort[key]}&`; 
    }
    for(let key in pagination){
        string+=`${key}=${pagination[key]}&`;
    }
  // console.log("string:",string);
  return new Promise(async (resolve)=>{
    const response=await axios.get('http://localhost:8080/products?'+string);
    const data=await response.data;
    const totalItems= await response.headers.get('X-Total-Count');
    resolve({data:{products:data,totalItems:totalItems}});
  })
}

export function fetchProductById(id) {
   
  return new Promise(async (resolve)=>{
    const response=await axios.get('http://localhost:8080/products/'+id);
    const data=await response.data;
    resolve({data});
  })
}
export function fetchProductByIdNull() {
   
  return new Promise(async (resolve)=>{
    
    const data=null;
    resolve({data});
  })
}


export function addProduct(newProduct) {
   
  // console.log("inside add product Api: ", newProduct);

  return new Promise(async (resolve)=>{
    const response=await axios.post('http://localhost:8080/products',newProduct,{
      headers: {'content-type':'application/json'}
    });
    const data=await response.data;
    resolve({data});
  })
}

export function updateProduct(updateItem){
 
  // console.log("updateItem Id: ",updateItem.itemId);
  // console.log("update Product ",updateItem.product);

  return new Promise (async (resolve)=>{
    // console.log("updateItems", updateItem);  
    const response =await axios.patch('http://localhost:8080/products/'+updateItem.itemId,updateItem.product,{
    headers:{'content-type':'application/json'},
    });
    const data=await response.data;
    // console.log("inside data: ",data);
    resolve({data});
  })  
}


