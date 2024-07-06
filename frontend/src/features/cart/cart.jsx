import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems, updateItemsAsync,deleteItemFromCartAsync, selectCartStatus, fetchItemsByUserIdAsync } from './cartListSlice';
// import styles from './Counter.module.css';
import { Navigate } from 'react-router-dom';
import { Fragment} from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon,PlusIcon,MinusIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import { selectUserInfo } from '../auth/authSlice';
import { fetchUserForUpdateAsync, selectUpdateUser } from '../user/userSlice';
import { toast } from 'react-toastify';


//Todo: handle same products into cart from different orders 
export default function CartPage() {
  
const dispatch=useDispatch();
  const loggedUser=useSelector(selectUserInfo);
  // console.log("logged user:",loggedUser);
  const products=useSelector(selectItems);
  console.log("products:",products);
 const cartLoaded=useSelector(selectCartStatus);
  // if(!products.length){
  //   <Navigate to="/" replace={true}></Navigate>
  // }
  const [open, setOpen] = useState(true)
 const tentaiveAmount=products.reduce((amount,item)=>item.product.price*item.quantity +amount,0);
 const totalAmount=Math.ceil(tentaiveAmount);
//  const totalItems=products.reduce((total,item)=>item.quantity+total);


useEffect(()=>{
  dispatch(fetchUserForUpdateAsync()) //not able to fetch on refresh on cart through app.js hence added here
},[]);

// console.log("userForUpdate: ",userForUpdate);
 const handleQuantity=(e,product)=>{
     
     dispatch(updateItemsAsync({itemId:product.id,quantity:product.quantity+1}))
     
 }
 const handleQuantityMinus=(e,product)=>{
  if(product.quantity>1){
  dispatch(updateItemsAsync({itemId:product.id,quantity:product.quantity-1}))
 }
}
 const handleRemove=(itemId)=>{
  toast.dismiss();
  dispatch(deleteItemFromCartAsync(itemId));
 }

 const handleToast=(e,itemId)=>{
  // console.log("remove: ",itemId);
  // console.log(itemId);
  toast(
    <div
        id="toast-interactive"
        className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
        role="alert"
      >
        <div className="flex">
          <div className="ms-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              Are You sure you want to remove the item
            </span>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <button 
                onClick={()=>{handleRemove(itemId)}}
                  className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >
                  Yes
                </button>
              </div>
              <div>
                <button
                onClick={() => {
                  toast.dismiss();
                }}
                  className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>,
    {
      autoClose: false,
      position: "top-center",
    }
  );
  
  
 }
  return (
    <>
    {!products.length && <Navigate to="/" replace={true}></Navigate>}
    
    <div  className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          
         

        <div className="mt-8 w-11/12">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.product.thumbnail}
                      alt={product.product.thumbnail}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.href}>{product.product.title}</a>
                        </h3>
                        <p className="ml-4">₹{product.product.price}</p>
                      </div>
                      
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                    <button onClick={(e)=>handleQuantityMinus(e,product)} className='flex w-3 '><MinusIcon/></button> <p className="text-gray-500">Qty {product.quantity} </p><button onClick={(e)=>handleQuantity(e,product)} className='flex w-3 '><PlusIcon/></button>

                      <div className="flex">
                        <button onClick={(e)=>handleToast(e,product.id)}
                          type="button"
                          
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
       </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6 ">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>₹{totalAmount}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <Link to="/checkout"
            href="#"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{' '}
            <Link to ="/">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => setOpen(false)}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
    
    </>
  )
}

