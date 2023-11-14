import React, { useEffect, useState } from 'react';
import useSWR from 'swr'
import { fetcher } from '../../network/fetcher.ts';
import { resWeatherData, weatherApiWithGridXY, weathersClassifiedWithCatergory, Code } from '../../data/weather.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { setXY } from '../../store/features/coords.ts';
import { dfs_xy_conv } from '../../service/changeCoordsToGrid.ts';


const WeatherTemplate = (props) => {
    const storeValue = useSelector((state: RootState) => state.coords);
    const { nx, ny } = storeValue;
    console.log(nx, ny);
    const dispatch = useDispatch();
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const nxny = dfs_xy_conv("toXY", lat, lng)! as { x: number, y: number };
                    console.log(nxny);

                    dispatch(setXY({ nx: nxny.x, ny: nxny.y }));
                }
            );
        } else {
            console.log('Geolocation is not supported by the browser')
        }
    }, [dispatch]); // Empty dependency array ensures the effect runs once after the component mounts

    // eslint-disable-next-line react-hooks/exhaustive-deps

    const { data, error, isLoading } = useSWR<resWeatherData>(weatherApiWithGridXY(nx, ny), fetcher);
    console.log(data, error, isLoading); //{response: {¡¦}}
    console.log(data?.response.body.items.item.length);
    let a;
    if (!isLoading && data) {
        const weathers = data?.response.body.items.item;
        for (let idx = 0; idx < weathers.length; idx++) {
            const element = weathers[idx];
            a = weathersClassifiedWithCatergory(element);
        }
    }
    console.log(a);

    return (
        <>
            weather
        </>
    )
}

export default WeatherTemplate;