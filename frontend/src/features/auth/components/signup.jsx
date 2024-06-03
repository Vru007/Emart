import React from "react";
import {Link} from 'react-router-dom';
import LoginPage from "../../../pages/loginPage";
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import { createUserAsync,selectUserInfo } from "../authSlice";
export function Signup(){
  const { register, handleSubmit, formState: { errors } } = useForm();
  const user= useSelector(selectUserInfo);
  // console.log(errors);
 const dispatch=useDispatch();
    return(
      <>
      {user?.email}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit((data)=>{dispatch(createUserAsync({email:data.email,password:data.password}))})} >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                 
                 {...register("email",{required: "email is required",pattern:{ value:/^\S+@\S+$/i ,message:`email is not valid`}})}
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
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
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm-Password
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

            <div>
              <button 
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up 
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
           <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Click to Login
            
            </Link>
          </p>
        </div>
      </div>
      </>
    )
}