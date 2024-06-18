// A mock function to mimic making an async request for data
import axios from "axios";
export function fetchOrders(userId) {
   
  return new Promise(async (resolve)=>{
    console.log("inside api id:",userId);
    const response=await fetch('http://localhost:3000/orders/?user.id='+userId)
    const data=await response.json();
    resolve({data});
  })
}

export function updateUser(update) {
   
    
    
  // console.log("user data in api: ",update);
  return new Promise(async (resolve)=>{
  
    // console.log("update: ",update);
    const userId=update.id;
    const response=await axios.patch('http://localhost:8080/user/update/'+userId,update,{
      headers:{'content-type':'application/json'}
    });
    const data=await response.data;
    console.log("data after api: ",data);
    resolve({data});
  })
}

export function fetchUserForUpdate(userId){
  return new Promise(async(resolve)=>{
   

   try{
    const response = await axios.get(`http://localhost:8080/user/${userId}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    const data=await response.data;
    console.log("data :",data);
    console.log("response: ",response);
    resolve({data});
   }
   catch(err){
    console.log(err);
   }
  })
}
