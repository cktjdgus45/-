import React, { useEffect, useState } from 'react';
import useSWR from 'swr'
import { fetcher } from '../../network/fetcher.ts';
import { resWeatherData, weatherApiWithGridXY, weathersClassifiedWithCatergory, Code, Weather } from '../../data/weather.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { setXY } from '../../store/features/coords.ts';
import { dfs_xy_conv } from '../../service/changeCoordsToGrid.ts';
import InfoBoxWrapper from './InfoBoxWrapper.tsx';
import Loader from '../UI/Loader.tsx';
import TodayWeather from './TodayWeather.tsx';


const WeatherTemplate = () => {
    const storeValue = useSelector((state: RootState) => state.coords);
    const { nx, ny } = storeValue;
    const dispatch = useDispatch();
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const nxny = dfs_xy_conv("toXY", lat, lng)! as { x: number, y: number };
                    dispatch(setXY({ nx: nxny.x, ny: nxny.y }));
                }
            );
        } else {
            console.log('Geolocation is not supported by the browser')
        }
    }, [dispatch]);


    const { data, isLoading } = useSWR<resWeatherData>(weatherApiWithGridXY(nx, ny), fetcher);
    const [classifedWeather, setClassfiedWeather] = useState<Map<Code, Weather[]>>();
    useEffect(() => {
        if (!isLoading && data) {
            const weathers = data?.response.body.items.item;
            for (let idx = 0; idx < weathers.length; idx++) {
                const element = weathers[idx];
                setClassfiedWeather(weathersClassifiedWithCatergory(element));
            }
        }
    }, [data, isLoading])
    return (
        <div className='w-full h-full'>
            {
                !isLoading && data && classifedWeather ?
                    (
                        <div className='relative w-full h-full                       '>
                            <TodayWeather codes={["TMP", "SKY", "TMX", "TMN", "PTY"]} classifedWeather={classifedWeather} />
                            <InfoBoxWrapper codes={["TMP", "SKY", "PTY"]} classifedWeather={classifedWeather} />
                        </div>
                    )
                    : <Loader isLoading={true} color='#FF914D' />
            }
        </div>
    )
}

export default WeatherTemplate;