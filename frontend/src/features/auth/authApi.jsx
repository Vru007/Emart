export function createUser(userData) {
   
    // console.log("user data in api: ",userData);
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

  export function checkUser(loginInfo) {
   
    return new Promise(async (resolve,reject)=>{
      const email =loginInfo.email;
      const password=loginInfo.password;
      const response=await fetch('http://localhost:3000/users?email='+email);
      const data=await response.json();
      console.log({data});
      if(data.length){

        if(password===data[0].password){
          resolve({data:data[0]});
          // <Navigate to="/"></Navigate>
        }
        else{
            reject({message:'Wrong Credentials'});
        }
      }
      else{
              
        reject({message:'User not found'});
      }
      
    })
  }