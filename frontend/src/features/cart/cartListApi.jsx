// A mock function to mimic making an async request for data
import axios from "axios";
export function addToCart(item) {
   

  return new Promise(async (resolve)=>{
    const response=await axios.post('http://localhost:8080/cart',item,{
      headers: {'content-type':'application/json'},
    });
    const data=await response.data;
    resolve({data});
  })
}
export function fetchItemsByUserId(userId){

  return new Promise (async (resolve)=>{
    const response =await axios.get('http://localhost:8080/cart?user='+userId);
    const data=await response.data;
    resolve({data});
  })
}
export function updateItems(updateItem){
 
  
  return new Promise (async (resolve)=>{
    // console.log("updateItems", updateItem);  
    const response =await axios.patch('http://localhost:8080/cart/'+updateItem.itemId,updateItem,{
    headers:{'content-type':'application/json'},
    });
    const data=await response.data;
    console.log("inside data: ",data);
    resolve({data});
  })  
}

export function deleteItemFromCart(itemId){

  console.log("itemId: ",itemId)
  return new Promise (async (resolve)=>{
    const response =await axios.delete('http://localhost:8080/cart/'+itemId,{
    headers:{'content-type':'application/json'},
    });
    const data=await response.data;
    resolve({data:{id:itemId}});
  })
}

export function resetCart(userId){

  return new Promise (async (resolve)=>{
    const response =await fetchItemsByUserId(userId);
    
    const items=response.data;
    for(let item of items){
      await deleteItemFromCart(item.id);
    }
    console.log("inside reset api: ");
    resolve({status:'success'})
  })
}

