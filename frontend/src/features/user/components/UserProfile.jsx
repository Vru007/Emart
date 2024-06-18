import React, { useState ,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentOrder } from '../../order/orderSlice';
import { selectUserInfo} from '../../auth/authSlice';
import { selectUpdateUser, updateUserAsync } from '../userSlice';
import { fetchUserForUpdateAsync } from '../userSlice';
import { useForm } from 'react-hook-form';
// import styles from './Counter.module.css';
import { Link, useNavigate } from 'react-router-dom';
export default function UserProfile() {
  //TODO :ADD New addresses vala baki hai
  const dispatch = useDispatch();
  // const user=useSelector(selectUserInfo);
  // const [user,setUser]=useState([]);
  // const fetchUser=()=>{
  //   setUser(useSelector(selectUserInfo));
  // }
  const loggeduser=useSelector(selectUserInfo);
  // console.log("loggeduser: ",loggeduser);
  useEffect(()=>{
    dispatch(fetchUserForUpdateAsync(loggeduser._id))
  },[]);
  

  const user=useSelector(selectUpdateUser)
console.log("user: ",user);
  //  fetchUser();
  const [selectedAddressIndex,setSelectedAddressIndex]=useState(-1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm();
  const handleEdit=(data,index)=>{
    const newUser={...user,addresses:[...user.addresses]}; //to shallow copy the data to avoid issues
    newUser.addresses.splice(index,1,data);
    dispatch(updateUserAsync(newUser));
    setSelectedAddressIndex(-1);
    
  }
  const handleRemove=(e,index)=>{
      const newUser={...user,addresses:[...user.addresses]};
      newUser.addresses.splice(index,1);
      dispatch(updateUserAsync(newUser),fetch);

      // fetchUser();
  }
  const handleEditForm=(index)=>{
     setSelectedAddressIndex(index);
     const address=user.addresses[index];
     setValue('Name',address.Name);
     setValue('Email',address.Email);
     setValue('addressType',address.addressType);
     setValue('Number',address.Number);
     setValue('street',address.street);
     setValue('city',address.city);
     setValue('state',address.state);
     setValue('postalcode',address.postalcode);
  }
  
  return (
  <>
  
  {user ? <div className=" pt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

   
     
    <div className="-my-8 px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
    <h1 className="text-xl md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
      Register E-mail: {user.email}
    </h1>
     
      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
        Addresses : 
      </h3>
      
      <div className="flex-col justify-center items-center w-full space-y-4 border-gray-200 border-b pb-4">
      {user.addresses.map((address,index)=>(
       <div>
       { selectedAddressIndex===index?
       <form onSubmit={handleSubmit((data)=>{
         handleEdit(data,index);
         reset();
       })}>
         <div className="space-y-12">
           <div className="border-b border-gray-900/10 pb-5">
             <h2 className="text-base font-semibold leading-7 text-gray-900">
               Address Information
             </h2>
   
             <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
             <div className="sm:col-span-4">
                 <label
                   htmlFor="address-type"
                   className="block text-sm font-medium leading-6 text-gray-900"
                 >
                  Address Type
                 </label>
                 <div className="mt-2">
                   <input
                     type="text"
                     {...register("addressType",{required: "address-Type is required",})}
                     id="address-type"
                     placeholder="like home, office, hostel......"
                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   />
                 </div>
               </div>
               <div className="sm:col-span-3">
                 <label
                   htmlFor="first-name"
                   className="block text-sm font-medium leading-6 text-gray-900"
                 >
                   Name
                 </label>
                 <div className="mt-2">
                   <input
                     type="text"
                     {...register("Name", { required: "Name is required" })} 
                     placeholder="Name"
                     id="Name"
                    
                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   />
                 </div>
               </div>
   
               
   
               <div className="sm:col-span-4">
                 <label
                   htmlFor="email"
                   className="block text-sm font-medium leading-6 text-gray-900"
                 >
                   Email address
                 </label>
                 <div className="mt-2">
                   <input
                     id="email"
                     {...register("Email", { required: "Email is required" })} 
                     type="email"
                     
                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   />
                 </div>
               </div>
               <div className="sm:col-span-4">
                 <label
                   
                   className="block text-sm font-medium leading-6 text-gray-900"
                 >
                   Phone Number
                 </label>
                 <div className="mt-2">
                   <input
                     id="phone"
                     {...register("Number", { required:"Phone number is required"})} 
                     type="tel"
                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   />
                 </div>
               </div>
   
               <div className="col-span-full">
                 <label
                   htmlFor="street-address"
                   className="block text-sm font-medium leading-6 text-gray-900"
                 >
                   Street address
                 </label>
                 <div className="mt-2">
                   <input
                     type="text"
                     {...register("street", { required: "Street is required" })} 
                     id="street"
                     
                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   />
                 </div>
               </div>
   
               <div className="sm:col-span-2 sm:col-start-1">
                 <label
                   htmlFor="city"
                   className="block text-sm font-medium leading-6 text-gray-900"
                 >
                   City
                 </label>
                 <div className="mt-2">
                   <input
                     type="text"
                     {...register("city", { required: "City is required" })} 
                     id="city"
                     
                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   />
                 </div>
               </div>
   
               <div className="sm:col-span-2">
                 <label
                   htmlFor="region"
                   className="block text-sm font-medium leading-6 text-gray-900"
                 >
                   State / Province
                 </label>
                 <div className="mt-2">
                   <input
                     type="text"
                     {...register("state", { required: "State/Provience is required" })}
                     id="state"
                     
                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   />
                 </div>
               </div>
   
               <div className="sm:col-span-2">
                 <label
                   htmlFor="postal-code"
                   className="block text-sm font-medium leading-6 text-gray-900"
                 >
                   ZIP / Postal code
                 </label>
                 <div className="mt-2">
                   <input
                     type="text"
                     name="postal-code"
                     {...register("postalcode", { required: "Postal Code is required" })}
                     
                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   />
                 </div>
               </div>
             </div>
           </div>
           <div className= "flex items-center justify-end gap-x-6">
             <button onClick={()=>setSelectedAddressIndex(-1)}
               type="button"
               className="text-sm font-semibold leading-6 text-gray-900"
             >
               Cancel
             </button>
             <button
               type="submit"
              
               className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >
               Save
             </button>
           </div>
           
         </div>
       </form>:null}
       <p className="text-base dark:text-white leading-4 text-gray-800 ">
           {address.addressType}
          </p>
      <div className="flex-col w-full p-10">
          
         
         <div className="text-base dark:text-gray-300 leading-4 text-gray-600">
          <div className="pb-0.5">Street: {address.street}</div>
          <div className="pb-0.5">City: {address.city}</div>
          <div className="pb-0.5">Postalcode: {address.postalcode}</div>
         
        </div>
          
        </div>
        <div className="mt- flex items-center justify-center gap-x-6">
                   <button onClick={()=>handleEditForm(index)} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                   >
                     
                     Edit
                   </button>
                   <button onClick={(e)=>handleRemove(e,index)} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                   >
 
                     Remove
                   </button>
                   
         </div>
      </div>
       ))}
      </div>
    </div>
    </div>:null}
   
   </>
   
  );
}
