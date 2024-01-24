import React from 'react';
import MinidenticonImg from './MinidenticonImg.tsx';

interface IAvartarProps {
    width: 10 | 15 | 20 | 24 | 28 | 36;
    height: 10 | 15 | 20 | 24 | 28 | 36;
    url: string;
    name: string;
}

const Avartar = ({ width, height, url, name }: IAvartarProps) => {
    return (
        <div className="rounded-full p-1">
            {url === "" ? (
                <MinidenticonImg
                    name={name}
                    saturation="80"
                    width={width.toString()}
                    height={height.toString()}
                />
            ) : (
                <img
                    src={url}
                    alt="User Avatar"
                    className={`w-${width} h-${height} rounded-full`}
                />
            )
            }
        </div>
    )
}

export default Avartar;