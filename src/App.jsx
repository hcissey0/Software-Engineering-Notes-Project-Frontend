import { Routes, Route, Navigate } from "react-router-dom";
import { useRef, useState } from "react";
import Modal from "./components/organisms/Modal";

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
  const [openModal, setOpenModal] = useState(false);
  
  return(
    <>
      <button onClick={()=>{setOpenModal(true)}}>Toggle modal</button>
      <Modal openModal={openModal} setOpenModal={setOpenModal}/>
    </>
  );
};

export default App;
