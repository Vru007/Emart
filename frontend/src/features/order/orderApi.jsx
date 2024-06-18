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

export function fetchOrder(userId){
  return new Promise(async(resolve)=>{
    const response =await axios.get('http://localhost:8080/orders/allorders?user='+userId,{
      headers: {'content-type': 'application/json'}
    })
    const data=await response.data;
    resolve({data});
  })
}
export function updateStatus(updateItem){

  return new Promise (async (resolve)=>{
    const response =await fetch('http://localhost:3000/orders/'+updateItem.id,{
    method:'PATCH',
    body:JSON.stringify(updateItem),
    headers:{'content-type':'application/json'},
    });
    const data=await response.json();
    resolve({data});
  })
}
export function fetchAllOrders(){
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:3000/orders');
    const data=await response.json();
    resolve({data});
  })
}
