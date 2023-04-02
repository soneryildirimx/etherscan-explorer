import React from "react";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { EtherContext } from "../context/Ether";
import { formatEther } from "ethers/lib/utils";
import { formatTimestamp } from "../utils/formatTimestamp";
import { Link } from "react-router-dom";

const Block = () => {
    const [activeTab, setActiveTab] = useState(1);
    const { provider } = useContext(EtherContext);
    const { id } = useParams();
    const blockNumber = parseInt(id);

    const [block, setBlock] = useState({});

    const getBlock = async () => {
        const block = await provider.getBlock(blockNumber);
        setBlock(block);
    };

    useEffect(() => {
        getBlock();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <h3 className="font-bold border-b border-border text-lg text-primary text-left pb-2 mb-4 mt-4">
                Block
            </h3>
            <div className="flex justify-start gap-4 mb-4">
                <button
                    className={
                        activeTab === 1
                            ? "text-primary border border-border p-2"
                            : "text-secondary border border-border p-2"
                    }
                    onClick={() => handleTabClick(1)}
                >
                    Block Details
                </button>
                <button
                    className={
                        activeTab === 2
                            ? "text-primary border border-border p-2"
                            : "text-secondary border border-border p-2"
                    }
                    onClick={() => handleTabClick(2)}
                >
                    Transactions
                </button>
            </div>
            {activeTab === 1 && (
                <table>
                    <tbody>
                        <tr>
                            <td className="text-left py-2 w-1/3 text-gray-100">
                                Block Number
                            </td>
                            <td className="text-left py-2 text-secondary">
                                {block.number}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-left py-2 w-1/3 text-gray-100">
                                Difficulty
                            </td>
                            <td className="text-left py-2 text-secondary">
                                {block.difficulty}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-left py-2 w-1/3 text-gray-100">
                                Extra Data
                            </td>
                            <td className="text-left py-2 text-secondary">
                                {block.extraData}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-left py-2 w-1/3 text-gray-100">
                                Miner
                            </td>
                            <td className="text-left py-2 text-secondary">
                                <Link to={`/account/${block.miner}`}>
                                    {block.miner}
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-left py-2 w-1/3 text-gray-100">
                                Gas Limit
                            </td>
                            <td className="text-left py-2 text-secondary">
                                {formatEther(
                                    block.gasLimit ? block.gasLimit : 0
                                )}{" "}
                                ETH
                            </td>
                        </tr>
                        <tr>
                            <td className="text-left py-2 w-1/3 text-gray-100">
                                Gas Used
                            </td>
                            <td className="text-left py-2 text-secondary">
                                {formatEther(block.gasUsed ? block.gasUsed : 0)}{" "}
                                ETH
                            </td>
                        </tr>
                        <tr>
                            <td className="text-left py-2 w-1/3 text-gray-100">
                                Hash
                            </td>
                            <td className="text-left py-2 text-secondary">
                                {block.hash}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-left py-2 w-1/3 text-gray-100">
                                Nonce
                            </td>
                            <td className="text-left py-2 text-secondary">
                                {block.nonce}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-left py-2 w-1/3 text-gray-100">
                                Parent Hash
                            </td>
                            <td className="text-left py-2 text-secondary">
                                {block.parentHash}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-left py-2 w-1/3 text-gray-100">
                                Timestamp
                            </td>
                            <td className="text-left py-2 text-secondary">
                                {formatTimestamp(block.timestamp)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
            {activeTab === 2 && (
                <div className="max-h-[600px] overflow-hidden overflow-y-auto text-left">
                    <ul>
                        {block.transactions &&
                            block.transactions.map((tx, index) => (
                                <li
                                    className="flex border-b border-border py-2"
                                    key={tx}
                                >
                                    <span className="text-secondary pr-2">
                                        {index + 1}.
                                    </span>
                                    <Link
                                        className="text-primary"
                                        to={`/transaction/${tx}`}
                                    >
                                        {tx}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Block;
