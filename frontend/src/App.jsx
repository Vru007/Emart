import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './index.css';
import HomePage from './pages/home';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import ForgotPassword from './features/auth/components/ForgotPassword';
import  CartPage  from './features/cart/cart';
import CheckoutPage from './pages/checkoutPage';
import {store} from './app/store';
// import AllOrders from './features/user/components/UserOrders';
import UserOrderPage from'./pages/UserOrdersPage';
import NotFound from './pages/404';
import LogoutPage from'./features/auth/components/Logout';
import AdminProductListPage from './pages/AdminProductListPage';
import UserProfilePage from './pages/UserProfilePage';
import SuccessOrder from './pages/SuccessOrders';
import { useDispatch } from 'react-redux';
import ProductDetailPage from './pages/productDetails';
import AdminProtected from './features/auth/components/ProtectedAdmin';
import AdminProductDetail from './features/admin/components/AdminProductDetail';
import AddProduct from './features/admin/components/AddProduct';
import AllorderedProducts from './features/admin/components/AllorderedProducts';
import ResetPasswordPage from './features/auth/components/ResetPassword';
import TempOrder from './pages/TempOrder';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Provider } from 'react-redux';
import Protected from './features/auth/components/Protected';
import { fetchItemsByUserIdAsync } from './features/cart/cartListSlice';
import { checkAuthAsync, selectUserChecked, selectUserInfo } from './features/auth/authSlice';
import { useSelector } from 'react-redux';
import { fetchUserForUpdateAsync } from './features/user/userSlice';
//TODO: Add alerts and loaders using react-alert library
const router = createBrowserRouter([
  {
    path: "/",
    element: (<div><HomePage/></div>),
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
    path: "/forgotpassword",
    element:(<ForgotPassword/>),
  },
  {
    path:"/owncart",
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
    path:"/temporder/:id",
    element:(<Protected><TempOrder/></Protected>)
  },
  {
    path:"/allorders",
    element:(<Protected><UserOrderPage/></Protected>)
  },
  {
    path:"/profile",
    element:(<Protected><UserProfilePage/></Protected>)
  },
  {
    path:"/logout",
    element:(<LogoutPage/>)
  },
  {
    path:"/forgotpassword",
    element:(<ForgotPassword/>)
  },
  {
    path:"/resetpassword",
    element:(<ResetPasswordPage/>)
  },
  {
    path:"/admin/products",
    element:(<AdminProtected><AdminProductListPage/></AdminProtected>)
  },
  {
    path:"/admin/addproduct",
    element:(<AdminProtected><AddProduct/></AdminProtected>)
  },
  {
    path:"/admin/edit/:id",
    element:(<AdminProtected><AdminProductDetail/></AdminProtected>)
  },
  {
    path:"/admin/orders/",
    element:(<AdminProtected><AllorderedProducts/></AdminProtected>)
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
 const userCheck=useSelector(selectUserChecked);

  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[dispatch])

  useEffect(()=>{
    if(user){
      
    dispatch(fetchItemsByUserIdAsync());
    console.log("items fetch by user useeffect");
    dispatch(fetchUserForUpdateAsync());
    }
  },[dispatch,user])
  return (
    <>
    <div className='App'>
      {userCheck && 
     <RouterProvider router={router} />
      }
    </div>
    </>
  )
}

export default App
