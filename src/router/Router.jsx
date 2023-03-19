import { Routes, Route } from "react-router-dom";
// Pages
import Account from "../pages/Account";
import Block from "../pages/Block";
import Transaction from "../pages/Transaction";
import Home from "../pages/Home";
import NoMatch from "../pages/NoMatch";

// Layouts
import AppLayout from "../layouts/AppLayout";
import NotFoundLayout from "../layouts/NotFoundLayout";

const Router = () => {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route index path="/" element={<Home />} />
                <Route path="/account/:id" element={<Account />} />
                <Route path="/block/:id" element={<Block />} />
                <Route path="/transaction/:id" element={<Transaction />} />
            </Route>
            <Route path="*" element={<NotFoundLayout />}>
                <Route index element={<NoMatch />} />
            </Route>
        </Routes>
    );
};

export default Router;
