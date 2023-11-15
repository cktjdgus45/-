import React from 'react';
import { Weather } from '../../data/weather';

interface InfoBoxProps {
    tmpsky: { tmp: Weather, sky: Weather }[]
}
const InfoBox = ({ tmpsky }: InfoBoxProps) => {
    return (
        <>
            {tmpsky.map(item => (
                <>
                    {item.sky.fcstValue}
                    {item.tmp.fcstValue}
                </>
            ))}
        </>
    )
}

export default InfoBox;