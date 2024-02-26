import React from 'react';
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
                <img
                    src={process.env.PUBLIC_URL + '/default_user.png'}
                    alt="User Avatar"
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