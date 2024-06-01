// A mock function to mimic making an async request for data
export function fetchAllProducts() {
   
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:3000/products');
    const data=await response.json();
    resolve({data});
  })
}
export function fetchAllCategories() {
   
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:3000/categories');
    const data=await response.json();
    resolve({data});
  })
}
export function fetchAllBrands() {
   
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:3000/brands');
    const data=await response.json();
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
  
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:3000/products?'+string);
    const data=await response.json();
    const totalItems= await response.headers.get('X-Total-Count');
    resolve({data:{products:data,totalItems:totalItems}});
  })
}

