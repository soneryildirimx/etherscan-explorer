import { BigNumber } from "ethers";

export const formatUnits = (value, decimals) => {
    return BigNumber.from(value)
        .div(BigNumber.from(10).pow(decimals))
        .toString();
};
