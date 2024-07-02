// A mock function to mimic making an async request for data
import axios from "axios";
export function createOrder(update) {
  return new Promise(async (resolve)=>{
    const response=await axios.post('http://localhost:8080/orders',update,{
      headers: {'content-type': 'application/json'}
    });
    const data=await response.data;
    resolve({data});
  })
}

export function fetchOrder(){
  return new Promise(async(resolve)=>{
    const response =await axios.get('http://localhost:8080/orders/orderbyid',{
      headers: {'content-type': 'application/json'}
    })
    const data=await response.data;
    resolve({data});
  })
}
export function updateStatus(updateItem){

  // console.log("update Item in status api: ",updateItem);

  return new Promise (async (resolve)=>{
    const response =await axios.patch('http://localhost:8080/orders/update/'+updateItem.id,updateItem,{
    headers:{'content-type':'application/json'},
  });
    const data=await response.json();
    resolve({data});

  })
}
export function fetchOrderByItsId(id){
  
  return new Promise(async (resolve,reject)=>{
     const response=await axios.get('http://localhost:8080/orders/orderbyitsid/'+id);
     const data=await response.data;
     resolve({data});
    
})
}

export function fetchAllOrders(pagination){
  let string='';
  for(let key in pagination){
    string+=`${key}=${pagination[key]}&`;
}
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:8080/orders/allorders?'+string);
    const data=await response.json();
    const totalItems=await response.headers.get('Total-Order-Count')
    resolve({data:{orders:data,totalOrders:totalItems}});
  })
}

export function fetchPaymentOrder(order){

  console.log("order in api: ",order);
  return new Promise(async(resolve, reject)=>{
        const response=await axios.post('http://localhost:8080/payment/checkout',order,{
          headers: {'content-type': 'application/json'}
        });
      const data=response.data;
      resolve({data});
  })
}
