import React from 'react';
import { Code, Weather, YYYYMMDD, nowHours } from '../../data/weather.ts';
import InfoBox from './InfoBox.tsx';

interface InfoBoxWrapperProps {
    classifedWeather: Map<Code, Weather[]> | undefined;
    codes: Code[];
}

const InfoBoxWrapper = (props: InfoBoxWrapperProps) => {
    const { codes, classifedWeather } = props;
    // eslint-disable-next-line array-callback-return

    const tmps = classifedWeather?.get(codes[0])?.filter((item) => {
        if (YYYYMMDD() + nowHours().toString() <= item.fcstDate + item.fcstTime)
            return item;
    });
    const skys = classifedWeather?.get(codes[1])?.filter((item) => {
        if (YYYYMMDD() + nowHours().toString() <= item.fcstDate + item.fcstTime)
            return item;
    });
    const tmpsky: { tmp: Weather, sky: Weather }[] = [];
    if (tmps && skys) {
        for (let idx = 0; idx < tmps.length; idx++) {
            const tmp = tmps[idx];
            const sky = skys[idx];
            tmpsky.push({ tmp, sky });
        }
    }

    return (
        <>
            {
                <InfoBox tmpsky={tmpsky} />
            }
        </>
    )
}
export default InfoBoxWrapper;