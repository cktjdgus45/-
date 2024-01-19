import React from 'react';
import MinidenticonImg from './MinidenticonImg.tsx';

interface IAvartarProps {
    width: 15 | 25 | 30 | 35;
    height: 15 | 25 | 30 | 35;
    url: string;
    username: string;
}

const Avartar = ({ width, height, url, username }: IAvartarProps) => {
    return (
        <div className="bg-red p-1 rounded-full shadow-2xl">
            {url === "" ? (
                <MinidenticonImg
                    username={username}
                    saturation="80"
                    width={width.toString()}
                    height={height.toString()}
                />
            ) : (
                <img
                    src={url}
                    alt="User Avatar"
                    className={`bg-main-color w-${width} h-${height} rounded-full`}
                />
            )
            }
        </div>
    )
}

export default Avartar;