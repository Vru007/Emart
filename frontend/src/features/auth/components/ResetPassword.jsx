import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { resetPasswordAsync, selectResetPassError, selectResetPassword } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
function ResetPasswordPage(){

    const location=useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [token,setToken]=useState(null);
    const [email,setEmail]=useState(null);
    const error=useSelector(selectResetPassError);
    const resetPass=useSelector(selectResetPassword);
    const dispatch=useDispatch();
    useEffect(()=>{
      const params=new URLSearchParams(location.search);
      setToken(params.get('token'));
      setEmail(params.get('email'));
    },[location.search]);
    
     
    
     return (
        <>
        
        {(token && email)?
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {console.log("token: ",token)}
        {console.log("email: ",email)}
         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            onSubmit={handleSubmit((data)=>{
              console.log("data in reset password: ",data);
               dispatch(resetPasswordAsync({password:data.password,token:token,email:email}));
              
            })}
            className="space-y-6"
          >
          <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              New Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              autoComplete="password"
              {...register("password",{required: "password is required",pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, message:'min length should be of 8 characters, atleast 1 uppercase letter, 1 lower, 1 number, can have special charater'}})}
              type="password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
       
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm-New-Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="confirmPassword"
              autoComplete="confirmPassword"
              {...register("confirmPassword",{required: "confirm-password is required",
                validate:(value,formValues)=>value===formValues.password || 'password not matching'
              })}
              type="password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        {resetPass ? <p className="text-green-500">Reset successfully</p> :null}
        {error ? <p className="text-red-500">{error.message}</p>:null}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Send me back to{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
        </div>

            :<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"><h3>Linked Expired</h3></div>}
      </>
      
     )
}
export default ResetPasswordPage;