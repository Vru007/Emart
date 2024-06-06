// A mock function to mimic making an async request for data
export function fetchOrders(userId) {
   
  return new Promise(async (resolve)=>{
    console.log("inside api id:",userId);
    const response=await fetch('http://localhost:3000/orders/?user.id='+userId)
    const data=await response.json();
    resolve({data});
  })
}

