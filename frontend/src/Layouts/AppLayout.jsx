import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <div className="bg-backgroundLight dark:bg-backgroundDark">
      <Outlet />
    </div>
  );
};
export default AppLayout;
