import React from "react";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { EtherContext } from "../context/Ether";
import { formatEther } from "ethers/lib/utils";
import { formatTimestamp } from "../utils/formatTimestamp";
import { Link } from "react-router-dom";

const Block = () => {
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

    return (
        <div>
            <h1>Block</h1>
            <h2>{blockNumber}</h2>
            <p>Difficulty: {block.difficulty}</p>
            <p>Extra Data: {block.extraData}</p>
            <p>
                Miner:
                <Link to={`/account/${block.miner}`}>{block.miner}</Link>
            </p>
            <p>Number: {block.number}</p>
            <p>
                Gas Limit: {formatEther(block.gasLimit ? block.gasLimit : 0)}{" "}
                ETH
            </p>
            <p>
                Gas Used: {formatEther(block.gasUsed ? block.gasUsed : 0)} ETH
            </p>
            <p>Hash: {block.hash}</p>
            <p>Nonce: {block.nonce}</p>
            <p>Parent Hash: {block.parentHash}</p>
            <p>Timestamp: {formatTimestamp(block.timestamp)}</p>

            <h2>Transactions</h2>
            <ul>
                {block.transactions &&
                    block.transactions.map((tx) => (
                        <li key={tx}>
                            <Link to={`/transaction/${tx}`}>{tx}</Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Block;
