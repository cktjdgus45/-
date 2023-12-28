import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr'
import { fetcher } from '../../network/fetcher.ts';
import { resWeatherData, weatherApiWithGridXY, weathersClassifiedWithCatergory, Code, Weather } from '../../data/weather.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { setXY } from '../../store/features/coords.ts';
import { setAddress } from '../../store/features/address.ts';
import { dfs_xy_conv } from '../../service/changeCoordsToGrid.ts';
import InfoBoxWrapper from './InfoBoxWrapper.tsx';
import Loader from '../layout/Loader.tsx';
import TodayWeather from './TodayWeather.tsx';
import { useNavermaps } from 'react-naver-maps';


const WeatherTemplate = () => {
    const dispatch = useDispatch();
    const storeValue = useSelector((state: RootState) => state.coords);
    const { nx, ny } = storeValue;
    const navermaps = useNavermaps();
    const latlong = dfs_xy_conv("not", nx, ny)! as { lat: number, lng: number };
    const location = new navermaps.LatLng(
        latlong?.lat! as number,
        latlong?.lng! as number
    )
    naver.maps.Service.fromCoordToAddr({ coords: location }, function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
            return alert('Something wrong!');
        }
        const result = response.v2;
        const address = result.address;
        dispatch(setAddress({ name: address.jibunAddress }));
    });
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


    const { data, isLoading } = useSWR<resWeatherData>(weatherApiWithGridXY(nx, ny), fetcher, { revalidateOnMount: true });
    const [classifedWeather, setClassfiedWeather] = useState<Map<Code, Weather[]>>();
    useEffect(() => {
        if (!isLoading && data?.response.body.items) {
            const weathers = data?.response.body.items.item;
            for (let idx = 0; idx < weathers.length; idx++) {
                const element = weathers[idx];
                setClassfiedWeather(weathersClassifiedWithCatergory(element));
            }
        } else {
            mutate(weatherApiWithGridXY(nx, ny));
            console.log('NO_DATA')
        }
    }, [data, isLoading, data?.response.body.items, nx, ny])
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
                    : <Loader isLoading={true} color='#776B5D' />
            }
        </div>
    )
}

export default WeatherTemplate;