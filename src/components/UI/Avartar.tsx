import React from 'react';
import MinidenticonImg from './MinidenticonImg.tsx';

interface IAvartarProps {
    width: 24 | 28 | 32 | 36 | 40 | 45 | 50 | 64;
    height: 24 | 28 | 32 | 36 | 40 | 45 | 50 | 64;
    url: string;
    name: string;
}

const Avartar = ({ width, height, url, name }: IAvartarProps) => {
    return (
        <div className="rounded-full">
            {url === "" ? (
                <MinidenticonImg
                    name={name}
                    saturation="80"
                    width="28"
                    height="28"
                />
            ) : (
                <img
                    src={url}
                    alt="User Avatar"
                    className={`w-[${width}px] h-[${height}px] rounded-full`}
                />
            )
            }
        </div>
    )
}

export default Avartar;