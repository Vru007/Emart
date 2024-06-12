import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems, updateItemsAsync,deleteItemFromCartAsync } from './cartListSlice';
// import styles from './Counter.module.css';
import { Navigate } from 'react-router-dom';
import { Fragment} from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon,PlusIcon,MinusIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';

//Todo: handle same products into cart from different orders 
export default function CartPage() {
  const products=useSelector(selectItems);
  if(!products.length){
    <Navigate to="/" replace={true}></Navigate>
  }
  const [open, setOpen] = useState(true)
 const totalAmount=products.reduce((amount,item)=>item.price*item.quantity +amount,0);
//  const totalItems=products.reduce((total,item)=>item.quantity+total);
const dispatch=useDispatch();
 const handleQuantity=(e,product)=>{
     dispatch(updateItemsAsync({...product,quantity:product.quantity+1}))
     
 }
 const handleQuantityMinus=(e,product)=>{
  if(product.quantity>1){
  dispatch(updateItemsAsync({...product,quantity:product.quantity-1}))
 }
}

 const handleRemove=(e,itemId)=>{
  // console.log("remove: ",itemId);
  dispatch(deleteItemFromCartAsync(itemId));
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
                      src={product.thumbnail}
                      alt={product.thumbnail}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.href}>{product.title}</a>
                        </h3>
                        <p className="ml-4">₹{product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                    <button onClick={(e)=>handleQuantityMinus(e,product)} className='flex w-3 '><MinusIcon/></button> <p className="text-gray-500">Qty {product.quantity} </p><button onClick={(e)=>handleQuantity(e,product)} className='flex w-3 '><PlusIcon/></button>

                      <div className="flex">
                        <button onClick={(e)=>handleRemove(e,product.id)}
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
        <div className="flex justify-between text-base font-medium text-gray-900   ">
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

