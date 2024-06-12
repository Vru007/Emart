// A mock function to mimic making an async request for data
export function createOrder(order) {
   
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:3000/orders',{
      method: 'POST',
      body:JSON.stringify(order),
      headers: {'content-type': 'application/json'}
    });
    const data=await response.json();
    resolve({data});
  })
}

export function fetchOrder(orderId){
  return new Promise(async(resolve)=>{
    const response =await fetch('http://localhost:3000/orders?user.id='+orderId)
    const data=await response.json();
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
