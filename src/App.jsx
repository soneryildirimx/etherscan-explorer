import "./App.css";
import React from "react";
import Router from "./router/Router";
import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";

const chains = [mainnet, polygon];
const projectId = import.meta.env.VITE_WALLET_PROJECT_ID;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

const App = () => {
    return (
        <>
            <WagmiConfig client={wagmiClient}>
                <Router />
            </WagmiConfig>
            <Web3Modal
                projectId={projectId}
                ethereumClient={ethereumClient}
                themeMode="dark"
                themeVariables={{
                    "--w3m-font-family": "Roboto, sans-serif",
                    "--w3m-accent-color": "#242426",
                    "--w3m-accent-fill-color": "#fff",
                    "--w3m-background-color": "#242426",
                }}
            />
        </>
    );
};

export default App;
