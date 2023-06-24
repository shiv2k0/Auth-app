import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/register", {
        name,
        email,
        password,
      });
      alert("Registered Successfully, User can login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-screen flex justify-center items-center h-screen">
      <div className=" w-[25rem] shadow-lg p-14 mb-14 rounded-lg flex flex-col justify-center items-center border">
        <img
          className="py-2"
          src="https://cdn-icons-png.flaticon.com/128/9872/9872372.png"
          alt="logo"
        />
        <form onSubmit={onRegister} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1 ">
            <label className="text-xs uppercase font-bold">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="border  p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="text-xs uppercase font-bold">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="border   p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="text-xs uppercase font-bold">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border p-2 rounded-md "
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white p-2 rounded-md"
          >
            Register
          </button>
          <div className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-red-600 underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
