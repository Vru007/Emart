import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectTotalOrders } from "../../order/orderSlice";
import { useEffect } from "react";
import { fetchAllOrdersAsync } from "../../order/orderSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@headlessui/react";
// import { fetchsetStatus } from "../../product-list/productListsAPI";
import { updateStatusAsync } from "../../order/orderSlice";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
export default function AllorderedProducts(){
    const dispatch = useDispatch();
    const [newStatus,setStatus]=useState('');
    const [orders, setOrders] = useState([]);
    const [page,setPage]=useState(1);
    const limit=5;
    const totalItems=useSelector(selectTotalOrders)
    const handlePage=(page)=>{
      // console.log(page);
  
      setPage(page);
    }
      const fetchData = async () => {
          // dispatch(fetchAllOrdersAsync());
          const pagination={_page:page,_limit:limit};
          const fetchedOrders =await dispatch(fetchAllOrdersAsync({pagination}));
          // console.log("fetched orders:",fetchedOrders.payload);
          setOrders(fetchedOrders.payload.orders); // Assuming the payload contains orders
        };
    // fetchData();
    useEffect(()=>{
        fetchData();
    },[page]);
    // const orders=useSelector(selectAllOrders);
    // console.log("orders",orders);
    const handleChange=(e)=>{
        setStatus(e.target.value);
    }
    const updatedProducts=(products,productId)=>{
            return products.map(product=>{
                if(product.id===productId){
                    return {...product,status:newStatus};
                }
                else{
                    return product;
                }
             });
    }
    const handleStatus=async(e,order,index)=>{
        
       const product=order.products[index];
       const prod=await updatedProducts(order.products,product.id);
       const updatedOrder={...order,products:prod};
      //  console.log("updatedOrder",updatedOrder);
       dispatch(updateStatusAsync(updatedOrder));
       fetchData();
    }
    
    return (
        <>
        <Link to="/admin/products"
                      
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      cancel
                    </Link> 
        {orders.map(order=>(
            <>
            

        
  
          <div className="mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8">
      
      <div className="  mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
      <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
      <div className="flex flex-col  justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <p className="text-xl md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
          order #{order.id}
        </p>
  
        <div className="mt-4 md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
          <ul className="flex-col">
            {order.products.map((product, index) => (
                <>
              <div key={index} className="flex flex-col md:flex-row border-b border-gray-200 md:pb-8 md:space-y-0 space-y-4">
                <div className="w-full ">
                  <img
                    className="w-1/2 hidden md:block"
                    src={product.product.thumbnail}
                    alt="dress"
                  />
                  <img
                    className="w-1/2 md:hidden "
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
                      
                      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Status
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option >{product.status}</option>
                  <option value="Order-Accepted">Order-Accepted</option>
                  <option value="Order-Dispatched">Order-Dispatched</option>
                  <option value="Order-Delivered">Order-Delivered</option>
                </select>
              </div>
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
                      {product.product.quantity}
                      </p>
                      </div>
                      <div className="flex gap-3 lg:block">
                      <p className="font-medium text-sm leading-7 text-black">
                        Net Price
                      </p>
                      <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 rounded-full lg:mt-3">
                      {product.product.price * product.quantity}
                      </p>
                      </div>
                      
                 
                  </div>
                 
  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
    <div className="flex justify-between w-full">
      <p className="text-base dark:text-white leading-4 text-gray-800">
        Delivery Address
      </p>
      <div className=" mx-5 text-base dark:text-gray-300 leading-4 text-gray-600">
        <div className="pb-0.5">{order.selectedAddress[0].street}</div>
        <div className="pb-0.5">{order.selectedAddress[0].city}</div>
        <div className="pb-0.5">{order.selectedAddress[0].postalcode}</div>
      </div>
    </div>
    <div className="flex justify-between items-center w-full">
      <p className="text-base dark:text-white leading-4 text-gray-800">
        Payment Method
      </p>
      <p className="mx-5 text-base dark:text-gray-300 leading-4 text-gray-600">
        {order.PaymentMethod}
      </p>
    </div>
  </div>  
                  
                </div>
                
              </div>
              <Button onClick={(e)=>handleStatus(e,order,index)} to="/admin/products"
                      
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save Status
                </Button>
                </>
            ))}
          </ul>
         
        </div>
      </div>
  
      
    </div>
    </div>
    <div className=" mt-10 flex items-center justify-center gap-x-6 ">
          
                    
                  </div>
    </div>
          
          
        
        </>
    ))}
    {/*pagination code is from here*/ }

     <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <a onClick={()=>handlePage(page-1>0?page-1:0)}
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
              <a onClick={()=>handlePage(page+1<=Math.ceil(totalItems/limit)?page+1:Math.ceil(totalItems/limit))}
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(page-1)*limit+1}</span> to{" "}
                  <span className="font-medium">{(page*limit )}</span> of{" "}
                  <span className="font-medium">{totalItems}</span> results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <a onClick={()=>handlePage(page-1>=1?page-1:1)}
                    
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                  
                  {Array.from({length:Math.ceil(totalItems/limit)}).map((el,index)=>(

                    <div onClick={()=>handlePage(index+1)}
                  
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${index+1===page ? 'bg-indigo-600 text-white':'text-gray-900'}  ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                    >
                    {index+1<Math.ceil(totalItems/limit)?index+1:Math.ceil(totalItems/limit)}
                  </div>
                  ))
                            
                  }
                  
                  <a onClick={()=>handlePage(page+1<=Math.ceil(totalItems/limit)?page+1:Math.ceil(totalItems/limit))}
                    
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
      </>
    )
}