import { Outlet } from "react-router-dom";
import NoMatch from "../pages/NoMatch";

const NotFoundLayout = () => (
    <>
        <div className="h-screen">
            <NoMatch />
        </div>
        <Outlet />
    </>
);

export default NotFoundLayout;
