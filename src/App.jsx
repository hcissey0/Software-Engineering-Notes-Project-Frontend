import { Routes, Route, Navigate } from "react-router-dom";
import Mantine from "./components/organisms/Mantine";
import { MantineProvider } from "@mantine/core";
import Dropdown from "./components/organisms/Dropdown";
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
        
    </div>
  );
};

export default App;
