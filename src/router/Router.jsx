import App from "../App";
import { Routes, Route } from "react-router-dom";
import Account from "../pages/Account";
import Block from "../pages/Block";
import Transaction from "../pages/Transaction";
import Home from "../pages/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account/:id" element={<Account />} />
      <Route path="/block/:id" element={<Block />} />
      <Route path="/transaction/:id" element={<Transaction />} />
    </Routes>
  );
};

export default Router;
