import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className=" w-screen flex justify-center items-center h-screen">
      <div className=" w-[25rem] shadow-lg p-14 mb-14 rounded-lg flex flex-col justify-center items-center border">
        <img
          className="py-2"
          src="https://cdn-icons-png.flaticon.com/128/9872/9872372.png"
          alt="logo"
        />

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1 ">
            <label className="text-xs uppercase font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border   p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="text-xs uppercase font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded-md "
            />
          </div>
          <button className="bg-red-500 text-white p-2 rounded-md">
            Login
          </button>
          <div className="text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-red-600 underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
