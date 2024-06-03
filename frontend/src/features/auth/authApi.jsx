export function createUser(userData) {
   
    console.log("user data in api: ",userData);
    return new Promise(async (resolve)=>{
      const response=await fetch('http://localhost:3000/users',{
        method:'POST',
        body:JSON.stringify(userData),
        headers:{'content-type':'application/json'}
      });
      const data=await response.json();
      console.log(data);
      resolve({data});
    })
  }