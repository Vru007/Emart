// A mock function to mimic making an async request for data
export function fetchAllProducts() {
   
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:3000/products');
    const data=await response.json();
    resolve({data});
  })
}

export function fetchProductsByFilters(filter) {
   
  let string='';
  for(let key in filter){
    string+=`${key}=${filter[key]}`;
  }
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:3000/products?'+string);
    const data=await response.json();
    resolve({data});
  })
}

export function fetchFromSorting(option) {
  const string=`http://localhost:3000/products?_sort=${option.sorts}&_order=${option.order}`;
  return new Promise(async (resolve)=>{
    const response=await fetch(`http://localhost:3000/products?_sort=${option.sorts}&_order=${option.order}`);
    const data=await response.json();
    resolve({data});
  })
}