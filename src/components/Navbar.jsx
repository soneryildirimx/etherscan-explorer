import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";

const Navbar = () => {
  const [userAccount, setUserAccount] = useState(null);
  const [alance, setBalance] = useState(null);
  const [count, setCount] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [price, setPrice] = useState([]);
  const [etherSupply, setEtherSupply] = useState([]);
  const [updatedPriceDate, setUpdatedPriceDate] = useState(null);

  const getEtherPrice = async () => {
    const API_ETHER_KEY = import.meta.env.VITE_API_ETHER_KEY;

    const response = await fetch(
      `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${API_ETHER_KEY}`
    );
    const data = await response.json();
    const timestamp = Number(data.result.ethusd_timestamp);
    const date = new Date(timestamp);
    setUpdatedPriceDate(
      "Updated: " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
    );
    setPrice(data.result.ethusd);

    const response2 = await fetch(
      `https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${API_ETHER_KEY}`
    );
    const data2 = await response2.json();
    setEtherSupply(data2.result);
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setUserAccount(account);
      // getBalance();
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setUserAccount(accounts[0]);
      // getBalance();
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const wei = await ethereum.request({
        method: "eth_getBalance",
        params: [userAccount, "latest"],
      });

      const balance = parseInt(wei) / 1000000000000000000;
      setBalance(balance);
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  };

  const openUserInfo = () => {
    if (openModal) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    getEtherPrice();
    checkIfWalletIsConnected();
    connectWallet();
  }, []);

  return (
    <nav className="w-full flex">
      <div className="w-1/2 bg-red-500">sol</div>
      <div className="w-1/2 bg-blue-500">
        {userAccount ? (
          <div>
            <button onClick={() => openUserInfo()} className="bg-blue-500">
              Acc: {userAccount.substring(0, 6)}...{userAccount.substring(38)}
            </button>
            {openModal ? (
              <div className="bg-blue-500">
                <p>Account: {userAccount}</p>
                <p>Price: {price}</p>
                <p>Transaction: 1</p>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
