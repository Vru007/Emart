import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './index.css';
import HomePage from './pages/home';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import  CartPage  from './features/cart/cart';
import CheckoutPage from './pages/checkoutPage';
import ProductDetailPage from './pages/productDetails';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

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
    element:(<CartPage/>)
  },
  {
    path:"/checkout",
    element:(<CheckoutPage/>)
  },
  {
    path:"/details/:id",
    element:(<ProductDetailPage/>)
  }
]);
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='App'>
    <RouterProvider router={router} />
     </div>
    </>
  )
}

export default App
