import React from "react";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { EtherContext } from "../context/Ether";

const Block = () => {
    const { provider } = useContext(EtherContext);
    const { id } = useParams();
    const blockNumber = id;

    // useEffect(() => {
    //     if (blockNumber) {
    //         provider.getBlock(blockNumber).then((block) => {
    //             console.log(block);
    //         });
    //     }
    // }, [blockNumber]);

    return (
        <div>
            <h1>Block</h1>
            <h2>{blockNumber}</h2>
            {/* {singleBlockData.map((block, index) => {
                return (
                    <div key={index}>
                        <h3>{block.hash}</h3>
                        <h4>{block.number}</h4>
                    </div>
                );
            })} */}
        </div>
    );
};

export default Block;
