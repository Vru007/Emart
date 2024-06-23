import { useSelector } from "react-redux";
import {selectUserInfo} from "../authSlice";
import { Navigate } from "react-router-dom";
import { selectUpdateUser } from "../../user/userSlice";
function AdminProtected({children}){
    const user=useSelector(selectUserInfo);
    const userInfo=useSelector(selectUpdateUser);
    if(!user){
      return <Navigate to="/login"> </Navigate>;
    }
    if(user && userInfo.role==='admin'){
      return children;
    }

    return <Navigate to="/"></Navigate>;
    
}

export default AdminProtected;