import { useSelector } from "react-redux";
import {selectUserInfo} from "../authSlice";
import { Navigate } from "react-router-dom";
import { selectUpdateUser } from "../../user/userSlice";
function AdminProtected({children}){
    const user=useSelector(selectUserInfo);
    if(!user){
      return <Navigate to="/login"> </Navigate>;
    }
    console.log("user in protected admin routes: ",user)
    if(user && user.role==='admin'){
      return children;
    }

    return <Navigate to="/"></Navigate>;
    
}

export default AdminProtected;