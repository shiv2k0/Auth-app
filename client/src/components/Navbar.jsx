import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/user/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSignout = async () => {
    try {
      await axios.post("/api/logout").then(() => {
        dispatch(logout());
        navigate("/login");
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <div className="bg-red-500 text-white flex justify-between p-4 px-10">
        <div className="flex gap-10">
          <Link to="/">Home</Link>
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <button onClick={onSignout}>Sign out</button>
            </>
          )}
        </div>
        {user && <span className="cursor-pointer">{user?.name}</span>}
      </div>
    </>
  );
};
export default Navbar;
