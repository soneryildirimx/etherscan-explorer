import React, { createContext, useState } from "react";
import { ethers } from "ethers";
import { useEffect } from "react";

const INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY;
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_API_KEY}`
);

export const EtherContext = createContext({});

export const EtherProvider = ({ children }) => {
  const tenBlockWithDetails = [];
  const [yourBlockTransactions, setYourBlockTransactions] =
    useState(tenBlockWithDetails);
  const [currentBlock, setCurrentBlock] = useState([]);
  const [topTenBlocks, setTopTenBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [gasPrice, setGasPrice] = useState(null);

  const accountDetails = async () => {
    const getCurrentBlock = await provider.getBlockNumber();
    setCurrentBlock(getCurrentBlock);

    //SINGLE BLOCK TRANSACTIONS
    const blockTransaction = await provider.getBlock(getCurrentBlock);
    setTransactions(blockTransaction.transactions);

    //TOP TEN BLOCKS
    const getTopTenBlocks = await provider.getBlockNumber();
    const topTenBlocks = [];
    for (let i = 0; i < 10; i++) {
      const block = await provider.getBlock(getTopTenBlocks - i);
      topTenBlocks.push(block);
    }
    setTopTenBlocks(topTenBlocks);

    //GET BLOCK DETAILS
    const getBlockDetails = topTenBlocks.map(async (block) => {
      return block.number;
    });
    const blockDetails = await Promise.all(getBlockDetails);
    setTopTenBlocks(blockDetails);

    getBlockDetails.map(async (block) => {
      const singleBlockData = await provider.getBlock(block);
      tenBlockWithDetails.push(singleBlockData);
    });

    // GAS PRICE
    const gasPrice = await provider.getGasPrice();
    const latestGasPrice = ethers.utils.formatUnits(gasPrice, "ether");
    setGasPrice(latestGasPrice);
  };

  useEffect(() => {
    accountDetails();
  }, []);

  return (
    <EtherContext.Provider
      value={{
        currentBlock,
        topTenBlocks,
        yourBlockTransactions,
        transactions,
        gasPrice,
        provider,
      }}
    >
      {children}
    </EtherContext.Provider>
  );
};
