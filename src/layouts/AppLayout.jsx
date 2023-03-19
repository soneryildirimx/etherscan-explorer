import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AppLayout = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);

export default AppLayout;
