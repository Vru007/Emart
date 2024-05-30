import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './index.css';
import HomePage from './pages/home';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import  CartPage  from './features/cart/cart';
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
