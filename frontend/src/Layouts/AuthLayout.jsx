import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div className="bg-backgroundLight dark:bg-backgroundDark">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
