import React, { useEffect, useState } from 'react';
import useSWR from 'swr'
import { fetcher } from '../../network/fetcher.ts';
import { resWeatherData, weatherApiWithGridXY } from '../../data/weather.ts';
import { Coord } from '../../data/latlon.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { setXY } from '../../store/features/coords.ts';
import { dfs_xy_conv } from '../../service/changeCoordsToGrid.ts';


const WeatherTemplate = (props) => {
    const [location, setLocation] = useState<Coord>({ lat: 0, lng: 0 });
    const storeValue = useSelector((state: RootState) => state.coords);
    const { nx, ny } = storeValue;
    console.log(nx, ny);
    console.log(location);
    const dispatch = useDispatch();
    useEffect(() => {
        // Check if geolocation is supported by the browser
        if (navigator.geolocation) {
            // Get the current position
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Handle successful position retrieval
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const nxny = dfs_xy_conv("toXY", lat, lng)! as { x: number, y: number };
                    console.log(nxny);
                    setLocation(prev => (
                        { ...prev, lat, lng }
                    ));
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

    return (
        <>
            weather
        </>
    )
}

export default WeatherTemplate;