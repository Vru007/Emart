import { useSelector } from "react-redux";
import {selectUserInfo} from "../authSlice";
import { Navigate } from "react-router-dom";
function Protected({children}){
    const user=useSelector(selectUserInfo);

    if(!user){
      return <Navigate to="/login"> </Navigate>;
    }

    return children;
}

export default Protected;