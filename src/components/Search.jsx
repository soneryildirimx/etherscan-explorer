import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { EtherContext } from "../context/Ether";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

const Search = () => {
  const navigate = useNavigate();
  const { yourBlockTransactions, transactions } = useContext(EtherContext);
  const [userAccount, setUserAccount] = useState(null);

  const accountAddress = (e) => {
    e.preventDefault();
    let address = e.target.value;
    setUserAccount(address);
    navigate(`/account/${address}`);
    address = "";
  };

  const convertToEther = (wei) => {
    const ether = ethers.utils.formatEther(wei);
    return ether;
  };

  return (
    <div>
      <form>
        <input type="text" placeholder="Search for a Ether Account address" />
        <Link
          to={{
            pathname: `/account/${userAccount}`,
            state: { userAccount: userAccount },
          }}
        >
          <button
            onClick={(e) => {
              accountAddress(e);
            }}
          >
            Search
          </button>
        </Link>
      </form>

      {/* MAIN SECTION IF HOME PAGE */}
      <div className="w-full flex justify-between">
        <div className="w-1/2">
          <h3>Latest Blocks</h3>
          {yourBlockTransactions.map((block, index) => {
            return (
              <div key={index}>
                <div>
                  <p>BK</p>
                  <Link
                    to={{
                      pathname: `/block/${block.number}`,
                      state: { block: block.number },
                    }}
                  >
                    {block.number}
                  </Link>
                  <p>Timestamp: {block.timestamp}</p>
                </div>
                <div>
                  <span>Miner</span>
                  <Link
                    to={{
                      pathname: `/account/${block.miner}`,
                      state: { userAccount: block.miner },
                    }}
                  >
                    {block.miner}
                  </Link>
                  <div>
                    <span>Transactions</span>
                    <Link
                      to={{
                        pathname: `/block/${block.number}`,
                        state: { block: block.number },
                      }}
                    >
                      {block.transactions.length}
                    </Link>
                  </div>
                  <span>
                    <span>Reward</span>
                    <p>{convertToEther(block.baseFeePerGas)} ETH</p>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-1/2">
          <h3>Latest Transactions</h3>
          {transactions.map((transaction, index) => {
            return (
              <div key={index}>
                <p>TX</p>
                <Link
                  to={{
                    pathname: `/transaction/${transaction}`,
                    state: { transaction: transaction },
                  }}
                >
                  {transaction}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
