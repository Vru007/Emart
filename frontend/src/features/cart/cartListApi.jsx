// A mock function to mimic making an async request for data
export function addToCart(item) {
   
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:3000/cart',{
      method:'POST',
      body:JSON.stringify(item),
      headers: {'content-type':'application/json'},
    });
    const data=await response.json();
    resolve({data});
  })
}
export function fetchItemsByUserId(userId){

  return new Promise (async (resolve)=>{
    const response =await fetch('http://localhost:3000/cart?user='+userId);
    const data=await response.json();
    resolve({data});
  })
}
export function updateItems(updateItem){

  return new Promise (async (resolve)=>{
    const response =await fetch('http://localhost:3000/cart/'+updateItem.id,{
    method:'PATCH',
    body:JSON.stringify(updateItem),
    headers:{'content-type':'application/json'},
    });
    const data=await response.json();
    resolve({data});
  })
}

export function deleteItemFromCart(itemId){

  return new Promise (async (resolve)=>{
    const response =await fetch('http://localhost:3000/cart/'+itemId,{
    method:'DELETE',
    headers:{'content-type':'application/json'},
    });
    const data=await response.json();
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

