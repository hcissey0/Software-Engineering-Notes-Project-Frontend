import { Routes, Route, Navigate } from "react-router-dom";
import { loginAction } from "./utils/actions";
import "./App.css";
import Avatar from "./components/atoms/Avatar";
import AvatarSkeleton from "./components/atoms/AvatarSkeleton";
const PrivateRoute = ({ children }) => {
  const user = "e"; // to be implemented
  if (!user) return <Navigate to={"/login"} />;
  return <>{children}</>;
};

const PublicRoute = ({ children }) => {
  const user = ""; // to be implemented
  if (user) return <Navigate to={"/"} />;
  return <>{children}</>;
};

const App = ()=>{
  return(
    <div className='p-4'>
     {/* <AvatarSkeleton/> */}
    </div>
  );
};

export default App;
