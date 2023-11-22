import React from 'react';
import GridLoader from "react-spinners/GridLoader";

interface LoaderProps {
    isLoading: boolean;
    color: string;
}

const Loader = ({ isLoading, color }: LoaderProps) => {
    return (
        <div className='flex items-center justify-center h-full'>
            <div className="textcenter">
                <GridLoader
                    color={color} loading={isLoading} aria-label="Loading Spinner" />
            </div>
        </div>
    );
}

export default Loader;