import { Button } from "@mui/material";
import { logout } from "../config/firebase";

const Dashboard = () => {
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <h1>Dashboard (ruta protegida)</h1>
            <h2>Welcome User: </h2>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </>
    );
};
export default Dashboard;