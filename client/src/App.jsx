import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/user/userSlice";
// import.meta.env.REACT_APP_API_URL;

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
// without withCredentials true cookies info will not sent to server

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      axios.get("/api/profile").then(({ data }) => {
        dispatch(
          login({
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
          })
        );
      });
    }
  }, []);
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
