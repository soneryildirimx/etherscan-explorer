import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
    return (
        <div className="place-content-center grid h-full">
            <div className="mb-10">
                <h1>404</h1>
                <p>Page not found</p>
            </div>
            <Link
                className="border p-3"
                to="/"
                onClick={() => {
                    window.screenTop = 0;
                }}
            >
                Go to home
            </Link>
        </div>
    );
};

export default NoMatch;
