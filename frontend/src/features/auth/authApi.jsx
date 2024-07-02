import axios from 'axios';
export function createUser(userData) {
   
    // console.log("user data in api: ",userData);
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post('http://localhost:8080/auth/signup', userData, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true  // Correct spelling for withCredentials
        });
       const data=await response.data;
        resolve({data});  // Return response data directly
      } catch (error) {
        reject(error);  // Handle errors by rejecting the promise
      }
    });
  }

  export function checkUser(loginInfo) {
   
    return new Promise(async (resolve,reject)=>{
      const email =loginInfo.email;
      const password=loginInfo.password;
      // console.log(loginInfo);
      // const d=JSON.stringify(loginInfo);
      const d={email:email,password:password}
      try{
      const response=await axios.post('http://localhost:8080/auth/login',d,{
        headers:{'content-type':'application/json'}
      },{
        withCredentials:true
      });
      const data=await response.data;
      // console.log("data in auth Api: ",data);
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

  export function checkAuth() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get('http://localhost:8080/auth/check',{
          headers:{'content-type':'application/json'}
        });
        if (response) {
          const data = await response.data;
          resolve({ data });
        } else {
          const error = await response.text;
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
    });
  }
 

  export function signOut(userId){
    return new Promise(async(resolve,reject)=>{
       
      try {
        const response = await axios.get('http://localhost:8080/auth/logout');
        if (response) {
          resolve({ data:'success' });
        } else {
          const error = await response.text;
          reject(error);
        }
      } catch (error) {
        // console.log(error)
        reject( error );
      }
    });
  }

  export function resetPasswordRequest(email){
    return new Promise(async(resolve,reject)=>{
      
      try{
        const response=await axios.post('http://localhost:8080/auth/resetpasswordrequest',{email},{
          
          headers:{'content-type':'application/json'},
          withCredentials: true
        });
        
        
        if (response.status >= 200 && response.status < 300) {
          console.log("data in auth api: ", response.data);
          resolve(response.data);
      } else {
        console.log("inside error: ");
          reject(new Error(response.statusText));
      }

      }
      catch (error) {
        console.log(error);
        reject(error);
        
      }
    })
  }

  export function resetPassword(data){

    return new Promise(async(resolve,reject)=>{

      try{
        const response=await axios.post('http://localhost:8080/auth/resetpassword',data,{
          headers: {'Content-Type': 'application/json'},
          withCredentials:true,
        });

        if (response.status >= 200 && response.status < 300) {
          console.log("data in auth api: ", response.data);
          resolve(response.data);
      } else {
        console.log("inside error: ");
          reject(new Error(response.statusText));
      }

      }
      catch(err) {
        console.log(err);
        reject(err);
      }
    })
  }
