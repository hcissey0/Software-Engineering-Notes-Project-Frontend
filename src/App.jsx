import { Routes, Route, Navigate } from "react-router-dom";
import { loginAction } from "./utils/actions";
import "./App.css";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import API from "./utils/api";
import Layout from "./components/pages/Layout";
import Edit from "./components/pages/Edit";
import Signup from "./components/pages/Signup";
import CardSkeleton from "./components/organisms/CardSkeleton";

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

    <CardSkeleton addClass="w-1/2 mb-2"/>
    <CardSkeleton addClass="w-1/4" />
    
    </div>
  );
};

export default App;
