import React from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../features/cart/cartListSlice";
import { Navigate } from "react-router-dom";
import { deleteItemFromCartAsync} from "../features/cart/cartListSlice";
import { useDispatch } from "react-redux";
import { useState ,useEffect } from "react";
import { store } from "../app/store.js";
import axios from "axios";
import Loader from "./loading.jsx";

// import { Navigate } from "react-router-dom";
const addresses = [
  {
    id:1,
    name: "home",
    first_name: "John",
    last_name: "Smith",
    email: "john@gamil.com",
    phone: 1234456788,
    address: "amikunj society behind raj kamal petrol pump",
    city: "mehsana",
    state: "gujarat",
    zip: 384002,
  },
  {
    id:1,
    name: "work",
    first_name: "amber",
    last_name: "Smith",
    email: "john@gamil.com",
    phone: 1234456788,
    address: "amikunj society behind raj kamal petrol pump",
    city: "mehsana",
    state: "gujarat",
    zip: 384002,
  },
];
import { useForm } from "react-hook-form";
import { selectUserInfo } from "../features/auth/authSlice";
import { selectUpdateUser, updateUserAsync } from "../features/user/userSlice.jsx";
import { createOrderAsync, fetchPaymentOrderAsync, selectCurrentOrder, selectPaymentDetails } from "../features/order/orderSlice.jsx";
export default function CheckoutPage() {
  const [selectedAddress,setSelectedAddress]=useState(null);
  const [PaymentMethod,setPaymentMethod] =useState(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const prod=useSelector(selectItems);
  const [finalOrder,setfinalOrder] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  if(!prod.length)(
    navigate('/')
  )
 
  // const user=useSelector(selectUpdateUser);
const user =useSelector(selectUpdateUser);


   console.log("user in checkOut",user);
  const totalAmount=Math.ceil(prod.reduce((amount,item)=>item.product.price*item.quantity +amount,0));
  const totalItems=prod.reduce((total,item)=>item.quantity+total,0);
  const recentOrder=useSelector(selectCurrentOrder)
  const paymentOrder = useSelector(selectPaymentDetails);
  const handleRemove=(e,itemId)=>{
    // console.log("remove: ",itemId);
    dispatch(deleteItemFromCartAsync(itemId));
   }
  
   const handleAddresses=(e)=>{
    // console.log(e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
   }
   const handlePayment=(e)=>{
    // console.log(e.target.value);
    setPaymentMethod(e.target.value);
   }
   
  //  useEffect(()=>{
  //     // console.log(selectedAddress);
  //  },[selectedAddress]);

  //  useEffect(()=>{
  //   // console.log("inside useEffect:",PaymentMethod);
  //  },[PaymentMethod]);
  useEffect(() => {
    console.log("paymentOrder:",paymentOrder);
    if (PaymentMethod === "paynow" && paymentOrder) {
      console.log("useEffect is called");
      handleRazorpay(paymentOrder);
    }
  }, [paymentOrder]);

  const handleOrder = async (e) => {
    e.preventDefault();

    if (selectedAddress !== null && PaymentMethod !== null) {
      setLoading(true);

      const products = prod.map(product => ({ ...product, status: 'Order-Received' }));
      const order = { products, PaymentMethod, selectedAddress, totalAmount, totalItems };
        
      await setfinalOrder(order);
      console.log("finalOrder: ",finalOrder)

      
      if (PaymentMethod === "cash") {
        setLoading(false);
        dispatch(createOrderAsync(order));
        navigate('/ordersummary');
      }

      if (PaymentMethod === "paynow") {
        console.log("inside paynow: ");
        
        await dispatch(fetchPaymentOrderAsync(order));
      }
    }
  };
  
  
  const handleRazorpay = async (currentPaymentOrder) => {
    console.log("inside handleRazorPay");
    const checkPaymentOrder = setInterval(async () => {
     // Adjust your slice name accordingly
      
      if (finalOrder) {
        clearInterval(checkPaymentOrder);
        console.log("payment Order currentpayment: ", currentPaymentOrder);
        console.log("recentorder: ", finalOrder);
        const orderData = encodeURIComponent(JSON.stringify(finalOrder));
        // const orderId=recentOrder.id;
        setLoading(false);
        const { data: { key } } = await axios.get('http://localhost:8080/payment/getkey');
        console.log("key: ", key);
        
        const options = {
          key: key, // Enter the Key ID generated from the Dashboard
          amount: currentPaymentOrder.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "E-Mart Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: currentPaymentOrder.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: `http://localhost:8080/payment/verification?order=${orderData}`,
          prefill: {
            email: user.email,
            contact: "8469786095"
          },
          notes: {
            address: "Razorpay Corporate Office"
          },
          theme: {
            color: "#3399cc"
          }
        };
        const razor = new window.Razorpay(options);
        razor.open()
        
      }
    }, 100);

    setTimeout(() => {
      clearInterval(checkPaymentOrder);
      if (!finalOrder) {
        console.error("Payment order fetching timed out");
        setLoading(false);
      }
    }, 5000);
  };
 
  
  
  //TODO: REdirect after succes o order (done)
  //Clear cart after sucessful order
  // on server change the stock available in inventory
 
  return (
    <>
    {!prod.length && <Navigate to="/" replace={true}></Navigate>}
    {loading && <Loader />}
    { user && !loading &&
    <div className="mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit((data)=>{
            console.log({data});
            // dispatch(
            //   updateUserAsync({
            //     ...user,
            //     addresses: [...user.addresses, data],
            //   }));
            // reset();
      
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
                        {...register("phoneNumber", { required:"Phone number is required"})} 
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
                <button
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
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Select from the saved addresses
                </h2>
                <ul role="list" className="divide-y divide-gray-100">
                  {user.addresses && user.addresses.map((address,index) => (
                    <li key={index} className="flex gap-x-6 py-5">
                      <input
                        onClick={(e)=>handleAddresses(e)}
                        name="address"
                        type="radio"
                        value={index}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.addressType}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.street}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment Methods
                    </legend>

                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="Cash"
                          name="payments"
                          type="radio"
                          value="cash"
                          onClick={(e)=>handlePayment(e)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-everything"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cash On Delivery
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="paynow"
                          name="payments"
                          type="radio"
                          value="paynow"
                          onClick={(e)=>handlePayment(e)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Pay Now
                        </label>
                      </div>
                      
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="lg:col-span-2">
          {/*cart page*/}

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="justify-between">
                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {prod.map((product) => (
                        <li key={product.product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={product.product.thumbnail}
                              alt={product.product.imageAlt}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={product.href}>{product.name}</a>
                                </h3>
                                <p className="ml-4 justify-between">₹{product.product.price}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.color}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500 mr-1">
                                Qty {product.quantity}
                              </p>

                              <div className="flex">
                                <button 
                                onClick={(e)=>handleRemove(e,product.id)}
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

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900 -mr-7">
                  <p>Subtotal</p>
                  <p>₹{totalAmount}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                  onClick={(e)=>handleOrder(e)}
                    href="#"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Pay and Order
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/">
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
        </div>
      </div>
    </div>
                    }
    </>
  );
  
}
