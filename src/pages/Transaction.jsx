import React from "react";
import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { EtherContext } from "../context/Ether";
import { formatUnits } from "../utils/formatUnits";

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
            {/* blocknumber için yönlendirme */}
            <p>Block Number: {transaction.blockNumber}</p>
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
                Value:{" "}
                {formatUnits(transaction.value ? transaction.value : 0, 18)}
            </p>
            <p>
                Gas Price:{" "}
                {formatUnits(
                    transaction.gasPrice ? transaction.gasPrice : 0,
                    9
                )}
            </p>
            <p>
                Gas Limit:{" "}
                {formatUnits(
                    transaction.gasLimit ? transaction.gasLimit : 0,
                    9
                )}
            </p>
            <p>Nonce: {transaction.nonce}</p>
            <p>Data: {transaction.data}</p>
            <p>Chain ID: {transaction.chainId}</p>
        </div>
    );
};

export default Transaction;
