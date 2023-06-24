import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-red-500 text-white flex gap-10 p-4 px-10">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};
export default Navbar;
