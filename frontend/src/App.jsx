import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";
import AuthLayout from "./Layouts/AuthLayout";
import AppLayout from "./Layouts/AppLayout";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Chat from "./Pages/Chat";

function App() {
  const { token } = useAuth();

  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route
          element={token ? <AppLayout /> : <Navigate to="/login" replace />}
        >
          <Route path="/" element={<Chat />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
