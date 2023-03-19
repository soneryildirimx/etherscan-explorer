import React from "react";
import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { EtherContext } from "../context/Ether";
import { formatEther } from "ethers/lib/utils";

const Transaction = () => {
    const { provider } = useContext(EtherContext);
    const { id } = useParams();
    const hash = id;

    const [transaction, setTransaction] = useState({});

    const getTransaction = async () => {
        const tx = await provider.getTransaction(hash);
        setTransaction(tx);
    };

    useEffect(() => {
        getTransaction();
    }, []);

    return (
        <div>
            <h1>Transaction Details</h1>
            <p>Hash: {transaction.hash}</p>
            <p>
                Block Number:
                <Link to={`/block/${transaction.blockNumber}`}>
                    {transaction.blockNumber}
                </Link>
            </p>
            <p>
                From:
                <Link to={`/account/${transaction.from}`}>
                    {transaction.from}
                </Link>
            </p>
            <p>
                To:{" "}
                <Link to={`/account/${transaction.to}`}>{transaction.to}</Link>
            </p>
            <p>
                Value: {formatEther(transaction.value ? transaction.value : 0)}{" "}
                ETH
            </p>
            <p>
                Gas Price:{" "}
                {formatEther(transaction.gasPrice ? transaction.gasPrice : 0)}{" "}
                ETH
            </p>
            <p>
                Gas Limit:{" "}
                {formatEther(transaction.gasLimit ? transaction.gasLimit : 0)}{" "}
                ETH
            </p>
            <p>Nonce: {transaction.nonce}</p>
            <p>Chain ID: {transaction.chainId}</p>
        </div>
    );
};

export default Transaction;
