import React from 'react';
import GridLoader from "react-spinners/GridLoader";
import ClipLoader from "react-spinners/ClipLoader";

interface LoaderProps {
    isLoading: boolean;
    color: string;
    kind: "clip" | "grid";
}

const Loader = ({ isLoading, color, kind }: LoaderProps) => {
    return (
        <div className='flex items-center justify-center h-full'>
            <div className="textcenter">
                {kind === "grid" && (<GridLoader color={color} loading={isLoading} aria-label="Loading Spinner" />)}
                {kind === "clip" && (<ClipLoader color={color} loading={isLoading} aria-label="Loading Spinner" />)}
            </div>
        </div>
    );
}

export default Loader;