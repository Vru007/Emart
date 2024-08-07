import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetCartAsync, selectItems } from "../features/cart/cartListSlice";
import { selectUserInfo } from "../features/auth/authSlice";
import { resetOrder } from "../features/order/orderSlice";

export default function SuccessOrder() {
  const order = useSelector(selectCurrentOrder);

  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  console.log("orders in ordersummary: ",order);
  useEffect(() => {
    // console.log("user: ", user);
    dispatch(resetCartAsync());
    // dispatch(resetOrder());
  }, [[dispatch]]);
  return (
    <>
      {order ? (

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    
    <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
    <div className="flex flex-col  justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
      <p className="text-xl md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
        order #{order.id}
      </p>

      <div className="mt-4 md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
        <ul className="flex-col">
          {order.products.map((product, index) => (
            <div key={index} className="flex flex-col md:flex-row border-b border-gray-200 md:pb-8 md:space-y-0 space-y-4">
              <div className="w-full ">
                <img
                  className="w-full hidden md:block"
                  src={product.product.thumbnail}
                  alt="dress"
                />
                <img
                  className="w-full md:hidden "
                  src={product.product.thumbnail}
                  alt="dress"
                />
              </div>

              <div className="w-full flex flex-col justify-start items-start space-y-8">
                <h3 className="text-xl pl-5 pr-5 dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                  {product.product.title}
                </h3>
              </div>

              <div className=" mx-5 pb-5 flex justify-between space-x-8 items-start w-full">
                <div className="flex flex-col md:flex-row gap-1 md:gap-5 lg:col-span-2 flex  max-lg:mt-3">
                  <div className="flex gap-3 lg:block">
                    <p className="font-medium text-sm leading-7 text-black">
                      Status
                    </p>
                    <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                      {product.status}
                    </p>
                  </div>
                    <div className="flex gap-3 lg:block">
                    <p className="font-medium text-sm leading-7 text-black">
                      Price
                    </p>
                    <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 rounded-full lg:mt-3 ">
                    ₹{product.product.price}
                    </p>
                    </div>
                    <div className="flex gap-3  lg:block ">
                    <p className="font-medium text-sm leading-7 text-black">
                     Quantity
                    </p>
                    <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 rounded-full lg:mt-3 ">
                    {product.quantity}
                    </p>
                    </div>
                    <div className="flex gap-3 lg:block">
                    <p className="font-medium text-sm leading-7 text-black">
                      Total
                    </p>
                    <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 rounded-full lg:mt-3">
                    {product.product.price * product.quantity}
                    </p>
                    </div>
               
                </div>
              </div>
            </div>
          ))}
        </ul>
        <div className="-my-8 px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
          Summary
        </h3>
        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
          <div className="flex justify-between w-full">
            <p className="text-base dark:text-white leading-4 text-gray-800">
              Subtotal
            </p>
            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
              ₹{order.totalAmount}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-white leading-4 text-gray-800">
              Shipping
            </p>
            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
              0
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
            Total
          </p>
          <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
            ₹{order.totalAmount}
          </p>
        </div>
      </div>
      </div>
    </div>

    
  </div>
  </div>
  <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link to="/"
                    
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    continue shopping
                  </Link>
                  
                </div>
  </div>
        
        
      ) : (
        navigate("/*")
      )}
    </>
  )
}
