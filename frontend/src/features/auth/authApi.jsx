import axios from 'axios';
export function createUser(userData) {
   
    // console.log("user data in api: ",userData);
    return new Promise(async (resolve)=>{
      const d=JSON.stringify(userData)
      const response=await axios.post('http://localhost:8080/auth/signup',d,{
        headers:{'content-type':'application/json'}
      },{
        withCredentails:true
      });
      const data=await response.data;
      // console.log(data);
      
      resolve({data});
    })
  }

  export function checkUser(loginInfo) {
   
    return new Promise(async (resolve,reject)=>{
      const email =loginInfo.email;
      const password=loginInfo.password;
      console.log(loginInfo);
      // const d=JSON.stringify(loginInfo);
      const d={email:email,password:password}
      try{
      const response=await axios.post('http://localhost:8080/auth/login',d,{
        headers:{'content-type':'application/json'}
      },{
        withCredentials:true
      });
      const data=await response.data;
      console.log("data in auth Api: ",data);
      // console.log("status",response.status)
      if(response.status>=200 && response.status<300){
        resolve({data});
      }
      else{
        reject({message:'User not found'});
      }

    }catch(e){
      reject({message:'user not found'});
    }
      
    })
  }

 

  export function signOut(userId){
    return new Promise(async(resolve)=>{
       
      resolve({data :'Succces'});
    });
  }

