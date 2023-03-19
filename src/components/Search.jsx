import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { EtherContext } from "../context/Ether";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { shortenAddress } from "../utils/shortenAddress";
import { formatTimestamp } from "../utils/formatTimestamp";

const Search = () => {
    const navigate = useNavigate();
    const { yourBlockTransactions, transactions } = useContext(EtherContext);
    const [userAccount, setUserAccount] = useState("");

    const accountAddress = (e) => {
        e.preventDefault();
        let address = userAccount;
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
                <input
                    type="text"
                    placeholder="Search for a Ether Account address"
                    value={userAccount}
                    onChange={(e) => {
                        setUserAccount(e.target.value);
                    }}
                />
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
            <div className="w-full flex gap-4 justify-between mt-10">
                <div className="w-1/2">
                    <h3 className="font-bold border-b border-gray-500 text-lg text-left pl-2 pb-2">
                        Latest Blocks
                    </h3>
                    {yourBlockTransactions.map((block, index) => {
                        return (
                            <div className="flex" key={index}>
                                <div>
                                    <p className="font-bold">BK</p>
                                    <Link
                                        to={{
                                            pathname: `/block/${block.number}`,
                                            state: { block: block.number },
                                        }}
                                    >
                                        {block.number}
                                    </Link>
                                    <p>{formatTimestamp(block.timestamp)}</p>
                                </div>
                                <div className="flex items-center">
                                    <div>
                                        <div>Miner</div>
                                        <Link
                                            to={{
                                                pathname: `/account/${block.miner}`,
                                                state: {
                                                    userAccount: block.miner,
                                                },
                                            }}
                                        >
                                            {shortenAddress(block.miner)}
                                        </Link>
                                    </div>
                                    <div>
                                        <div>Transactions</div>
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
                                        {/* <span>Reward</span> */}
                                        <p>
                                            {convertToEther(
                                                block.baseFeePerGas
                                            )}{" "}
                                            Eth
                                        </p>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="w-1/2">
                    <h3 className="font-bold border-b border-gray-500 text-lg text-left pl-2 pb-2">
                        Latest Transactions
                    </h3>{" "}
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
                                    {shortenAddress(transaction)}
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
