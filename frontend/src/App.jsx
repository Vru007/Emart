import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './index.css';
import HomePage from './pages/home';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import  CartPage  from './features/cart/cart';
import CheckoutPage from './pages/checkoutPage';
import AllOrders from './features/user/components/UserOrders';
import NotFound from './pages/404';
import SuccessOrder from './pages/SuccessOrders';
import { useDispatch } from 'react-redux';
import ProductDetailPage from './pages/productDetails';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Protected from './features/auth/components/Protected';
import { fetchItemsByUserIdAsync } from './features/cart/cartListSlice';
import { selectUserInfo } from './features/auth/authSlice';
import { useSelector } from 'react-redux';
const router = createBrowserRouter([
  {
    path: "/",
    element: (<HomePage/>),
  },
  {
    path: "/login",
    element: (<LoginPage/>),
  },
  {
    path: "/signup",
    element:(<SignupPage/>),
  },
  {
    path:"/cart",
    element:(<Protected><CartPage/></Protected>)
  },
  {
    path:"/checkout",
    element:(<Protected><CheckoutPage/></Protected>)
  },
  {
    path:"/details/:id",
    element:(<Protected><ProductDetailPage/></Protected>)
  },
  {
    path:"/ordersummary",
    element:(<Protected><SuccessOrder/></Protected>)
  },
  {
    path:"/allorders",
    element:(<Protected><AllOrders/></Protected>)
  },
  
  {

    path:"*",
    element:(<NotFound></NotFound>)
  }
]);
function App() {
  const [count, setCount] = useState(0);
  const user = useSelector(selectUserInfo);
  const dispatch =useDispatch();
  useEffect(()=>{
    if(user){
    dispatch(fetchItemsByUserIdAsync(user.id));
    }
  },[dispatch,user])
  return (
    <>
    <div className='App'>
    <RouterProvider router={router} />
     </div>
    </>
  )
}

export default App
