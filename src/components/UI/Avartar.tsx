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
        <div className="rounded-full">
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
                    className='w-10 h-10 rounded-full'
                />
            )
            }
        </div>
    )
}

export default Avartar;