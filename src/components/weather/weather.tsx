import React from 'react';
import useSWR from 'swr'
import { fetcher } from '../../network/fetcher.ts';
import { weatherApiWithGridXY } from '../../data/weather.ts';

const Weather = () => {
    const { data, error, isLoading } = useSWR(weatherApiWithGridXY(60, 127), fetcher);
    console.log(data, error, isLoading);
    return (
        <>
            weather
        </>
    )
}

export default Weather;