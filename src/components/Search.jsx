import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { EtherContext } from "../context/Ether";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { shortenAddress } from "../utils/shortenAddress";
import { formatTimestamp } from "../utils/formatTimestamp";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Search = () => {
    const navigate = useNavigate();
    const { latestblocks, transactions } = useContext(EtherContext);
    const [userAccount, setUserAccount] = useState("");
    const [loading, setLoading] = useState(true);

    const accountAddress = (e) => {
        if (userAccount === "") {
            e.preventDefault();
        } else {
            e.preventDefault();
            let address = userAccount;
            setUserAccount(address);
            navigate(`/account/${address}`);
            address = "";
        }
    };

    const convertToEther = (wei) => {
        const ether = ethers.utils.formatEther(wei);
        const typeNumberEther = Number(ether);
        const etherFixed = typeNumberEther.toFixed(2);
        return etherFixed;
    };

    useEffect(() => {
        if (latestblocks.length > 0 && transactions.length > 0) {
            setLoading(false);
        }
    }, [latestblocks, transactions]);

    return (
        <div className="pt-10">
            <form>
                <input
                    className="bg-gray-200 p-4 focus:outline-none w-1/2"
                    type="text"
                    placeholder="Search by Address / Txn Hash / Block"
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
                        className="border h-auto bg-green-100 hover:bg-green-200 transition-all text-secondary font-bold p-4"
                        onClick={(e) => {
                            accountAddress(e);
                        }}
                    >
                        Search
                    </button>
                </Link>
            </form>

            {/* MAIN SECTION IF HOME PAGE */}
            <div className="w-full md:flex gap-4 justify-between mt-10">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h3 className="font-bold border-b border-border text-lg text-left text-primary pb-2">
                        Latest Blocks
                    </h3>
                    {latestblocks &&
                        !loading &&
                        latestblocks.map((block, index) => {
                            return (
                                <div
                                    className="w-full flex justify-between text-left items-center place-content-center border-b border-border py-2 gap-4"
                                    key={index}
                                >
                                    <div className="w-1/4 flex items-center gap-2">
                                        <p className="border p-1 border-border font-bold text-secondary">
                                            BK
                                        </p>
                                        <div>
                                            <Link
                                                className="text-secondary text-xs md:text-md"
                                                to={{
                                                    pathname: `/block/${block.number}`,
                                                    state: {
                                                        block: block.number,
                                                    },
                                                }}
                                            >
                                                {block.number}
                                            </Link>
                                            <p className="text-[10px] text-gray-100">
                                                {shortenAddress(
                                                    formatTimestamp(
                                                        block.timestamp
                                                    )
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-1/4">
                                        <p className="text-secondary text-xs">
                                            Miner
                                        </p>
                                        <Link
                                            className="text-primary text-xs md:text-md"
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
                                    <div className="w-1/4 flex gap-2 items-center">
                                        <Link
                                            className="text-secondary"
                                            to={{
                                                pathname: `/block/${block.number}`,
                                                state: { block: block.number },
                                            }}
                                        >
                                            {block.transactions.length}
                                        </Link>
                                        <p className="text-xs font-bold text-gray-100">
                                            txns
                                        </p>
                                    </div>
                                    <div className="border border-border rounded-md p-1 text-xs gap-1 flex">
                                        {/* <span>Reward</span> */}
                                        <p className="text-secondary">
                                            {convertToEther(
                                                block.baseFeePerGas
                                            )}
                                        </p>
                                        <p className="text-gray-100">ETH</p>
                                    </div>
                                </div>
                            );
                        })}
                    {loading && (
                        <SkeletonTheme
                            baseColor="#202020"
                            highlightColor="#444"
                        >
                            <Skeleton
                                count={10}
                                height={20}
                                style={{
                                    margin: "10px 0",
                                }}
                            />
                        </SkeletonTheme>
                    )}
                </div>
                <div className="md:w-1/2">
                    <h3 className="font-bold border-b border-border text-lg text-primary text-left pb-2">
                        Latest Transactions
                    </h3>
                    {transactions &&
                        !loading &&
                        transactions.map((transaction, index) => {
                            return (
                                <div
                                    className="flex justify-between items-center border-b border-border py-4"
                                    key={index}
                                >
                                    <p className="text-secondary">TX</p>
                                    <Link
                                        className="text-primary"
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
                    {loading && (
                        <SkeletonTheme
                            baseColor="#202020"
                            highlightColor="#444"
                        >
                            <Skeleton
                                count={10}
                                height={20}
                                style={{
                                    margin: "10px 0",
                                }}
                            />
                        </SkeletonTheme>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
