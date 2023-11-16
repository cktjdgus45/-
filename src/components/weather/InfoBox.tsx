import React from 'react';
import { Weather } from '../../data/weather';

interface InfoBoxProps {
    tmp: Weather,
    sky: Weather
}
const InfoBox = ({ tmp, sky }: InfoBoxProps) => {
    return (
        <div className="flex flex-col ">
            <div>
                {tmp.fcstTime}
            </div>
            <div>
                {tmp.fcstValue}
            </div>
            <div>
                {sky.fcstValue}
            </div>
        </div>
    )
}

export default InfoBox;