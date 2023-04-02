import React from "react";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EtherContext } from "../context/Ether";
import Table from "../components/Table";
import useEtherStore from "../store/useEtherStore";
import { shortenAddress } from "../utils/shortenAddress";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Account = () => {
    const store = useEtherStore();
    const { etherPrice } = store;
    const { provider } = useContext(EtherContext);
    const { id } = useParams();
    const acc = id;

    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [totalTransactions, setTotalTransactions] = useState(null);
    const [name, setName] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    const [accountHistory, setAccountHistory] = useState([]);
    const [internalByAddress, setInternalByAddress] = useState([]);
    const [ERC20, setERC20] = useState([]);
    const [ERC721, setERC721] = useState([]);
    const [ERC1155, setERC1155] = useState([]);
    const [blockMindedByAddress, setBlockMindedByAddress] = useState([]);
    const [blockRangeTransactions, setBlockRangeTransactions] = useState([]);

    const accountData = async () => {
        try {
            setAccount(acc);
            const balance = await provider.getBalance(acc);
            setBalance(ethers.utils.formatEther(balance));
            const totalTransactions = await provider.getTransactionCount(acc);
            setTotalTransactions(totalTransactions);
            const ENS = await provider.lookupAddress(acc);
            if (ENS !== null) {
                setName(ENS);
            } else {
                setName(acc);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }

        const API_ETHER_KEY = import.meta.env.VITE_API_ETHER_KEY;

        // TRANSACTION HISTORY
        await fetch(
            `https://api.etherscan.io/api?module=account&action=txlist&address=${acc}&startblock=0&endblock=99999999&sort=asc&apikey=${API_ETHER_KEY}`
        )
            .then((res) => res.json())
            .then((data) => {
                setAccountHistory(data.result);
            });
        // console.log("accountHistory", accountHistory);
        // INTERNAL TRANSACTIONS
        await fetch(
            `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${acc}&startblock=0&endblock=99999999&sort=asc&apikey=${API_ETHER_KEY}`
        )
            .then((res) => res.json())
            .then((data) => {
                setInternalByAddress(data.result);
            });
        // console.log("internalByAddress", internalByAddress);

        // ERC20 TOKENS
        await fetch(
            `https://api.etherscan.io/api?module=account&action=tokentx&address=${acc}&startblock=0&endblock=99999999&sort=asc&apikey=${API_ETHER_KEY}`
        )
            .then((res) => res.json())
            .then((data) => {
                setERC20(data.result);
            });

        // console.log("ERC20", ERC20);

        // ERC721 TOKENS
        await fetch(
            `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${acc}&startblock=0&endblock=99999999&sort=asc&apikey=${API_ETHER_KEY}`
        )
            .then((res) => res.json())
            .then((data) => {
                setERC721(data.result);
            });

        // console.log("ERC721", ERC721);

        // ERC1155 TOKENS
        await fetch(
            `https://api.etherscan.io/api?module=account&action=tokentx&address=${acc}&startblock=0&endblock=99999999&sort=asc&apikey=${API_ETHER_KEY}`
        )
            .then((res) => res.json())
            .then((data) => {
                setERC1155(data.result);
            });

        // console.log("ERC1155", ERC1155);

        // BLOCK MINED BY ADDRESS
        await fetch(
            `https://api.etherscan.io/api?module=account&action=getminedblocks&address=${acc}&blocktype=blocks&apikey=${API_ETHER_KEY}`
        )
            .then((res) => res.json())
            .then((data) => {
                setBlockMindedByAddress(data.result);
            });

        // console.log("blockMindedByAddress", blockMindedByAddress);

        // BLOCK RANGE TRANSACTIONS
        await fetch(
            `https://api.etherscan.io/api?module=account&action=getblockrange&address=${acc}&startblock=0&endblock=99999999&apikey=${API_ETHER_KEY}`
        )
            .then((res) => res.json())
            .then((data) => {
                setBlockRangeTransactions(data.result);
            });

        // console.log("blockRangeTransactions", blockRangeTransactions);
    };

    useEffect(() => {
        accountData();
    }, []);

    return (
        <>
            {loading ? (
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <Skeleton
                        count={7}
                        height={20}
                        style={{
                            margin: "10px 0",
                        }}
                    />
                </SkeletonTheme>
            ) : (
                <div className="account">
                    <div>
                        <h3 className="font-bold border-b border-border text-lg text-primary text-left pb-2 mb-4 mt-4">
                            Account
                        </h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="py-2 w-1/3 text-gray-100">
                                        Account
                                    </td>
                                    <td className="py-2 text-secondary">
                                        {shortenAddress(acc)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 w-1/3 text-gray-100">
                                        Balance
                                    </td>
                                    <td className="py-2 text-secondary">
                                        {balance} ETH
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 w-1/3 text-gray-100">
                                        Balance Value
                                    </td>
                                    <td className="py-2 text-secondary">
                                        $ {balance * etherPrice}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 w-1/3 text-gray-100">
                                        Total Transactions
                                    </td>
                                    <td className="py-2 text-secondary">
                                        {totalTransactions}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 w-1/3 text-gray-100">
                                        Name
                                    </td>
                                    <td className="py-2 text-secondary">
                                        {shortenAddress(name)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="mt-10">
                {!loading ? (
                    <Table
                        accountHistory={accountHistory}
                        internalByAddress={internalByAddress}
                        ERC20={ERC20}
                        ERC721={ERC721}
                        ERC1155={ERC1155}
                        blockMindedByAddress={blockMindedByAddress}
                        blockRangeTransactions={blockRangeTransactions}
                    />
                ) : null}
            </div>
        </>
    );
};

export default Account;
