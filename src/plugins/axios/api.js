import axios from "axios";

const api = axios.create({
    baseURL: "https://api.etherscan.io/",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default api;
