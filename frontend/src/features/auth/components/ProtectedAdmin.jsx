import { useSelector } from "react-redux";
import {selectUserInfo} from "../authSlice";
import { Navigate } from "react-router-dom";
function AdminProtected({children}){
    const user=useSelector(selectUserInfo);

    if(!user){
      return <Navigate to="/login"> </Navigate>;
    }
    if(user && user.role==='admin'){
      return children;
    }

    return <Navigate to="/"></Navigate>;
    
}

export default AdminProtected;