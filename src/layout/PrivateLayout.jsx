import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const PrivateLayout = () => {
    const { user } = useUserContext();

    return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateLayout;
