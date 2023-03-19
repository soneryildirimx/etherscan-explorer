import Web3 from "web3";

export const web3 = new Web3(
    new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/YOUR_API_KEY")
);

export const web3ws = new Web3(
    new Web3.providers.WebsocketProvider(
        "wss://sepolia.infura.io/ws/v3/YOUR_API_KEY"
    )
);
