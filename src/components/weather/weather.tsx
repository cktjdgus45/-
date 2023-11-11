import React, { useEffect, useState } from 'react';
import useSWR from 'swr'
import { fetcher } from '../../network/fetcher.ts';
import { weatherApiWithGridXY } from '../../data/weather.ts';
import { Coord } from '../../data/latlon.ts';
import { dfs_xy_conv } from '../../service/changeCoordsToGrid.ts';
interface WeatherProps {
    setCoord: React.Dispatch<React.SetStateAction<Coord>>;
    coord: Coord;
}
type positionCoordGridXY = {
    lat: number;
    lng: number;
    x: number;
    y: number;
}
const Weather = (props: WeatherProps) => {
    const { coord, setCoord } = props;
    const [positionObj, setPositionObj] = useState<positionCoordGridXY>();
    console.log(coord, positionObj)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onSuccessGeolocation = (position) => {
        const myPosition: Coord = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        }
        const positionObj = dfs_xy_conv("toXY", position.coords.latitude, position.coords.longitude,) as positionCoordGridXY;
        setCoord(myPosition);
        setPositionObj(positionObj);
    }
    useEffect(() => {
        if (!coord.lat && !coord.lng) {
            navigator.geolocation.getCurrentPosition(
                onSuccessGeolocation,
            )
        }
    }, [coord.lat, coord.lng, onSuccessGeolocation]);
    const { data, error, isLoading } = useSWR(weatherApiWithGridXY(60, 127), fetcher);
    console.log(data, error, isLoading);
    return (
        <>
            weather
        </>
    )
}

export default Weather;