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
        <div className='flex items-center justify-center w-full h-full'>
            <div className="textcenter">
                {kind === "grid" && (<GridLoader color={color} loading={isLoading} aria-label="로딩중" />)}
                {kind === "clip" && (<ClipLoader size={15} color={color} loading={isLoading} aria-label="로딩중" />)}
            </div>
        </div>
    );
}

export default Loader;