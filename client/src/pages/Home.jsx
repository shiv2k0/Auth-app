import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="flex flex-col items-center justify-center my-10 gap-1">
      <div>{user?.name}</div>
      <div>{user?.email}</div>
    </div>
  );
};
export default Home;
