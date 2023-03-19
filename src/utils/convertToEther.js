export const convertToEther = (wei) => {
    const ether = ethers.utils.formatEther(wei);
    return ether;
};
