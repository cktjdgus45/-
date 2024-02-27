import React from 'react';
interface IAvartarProps {
    width: 24 | 28 | 32 | 36 | 40 | 45 | 50 | 64;
    height: 24 | 28 | 32 | 36 | 40 | 45 | 50 | 64;
    url: string;
    name: string;
}

const Avartar = ({ width, height, url, name }: IAvartarProps) => {

    return (
        <figure className="rounded-full">
            {url === "" ? (
                <img
                    src={process.env.PUBLIC_URL + '/default_user.png'}
                    alt={name}
                />
            ) : (
                <img
                    src={url}
                    alt={name}
                    className={`w-[${width}px] h-[${height}px] rounded-full`}
                />
            )
            }
        </figure>
    )
}

export default Avartar;