import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Code, Weather, YYYYMMDD, nowHours, sky } from '../../data/weather.ts';
import Icon from '../UI/Icon.tsx';
import { faO } from '@fortawesome/free-solid-svg-icons';
import { useNavermaps } from 'react-naver-maps';
import { dfs_xy_conv } from '../../service/changeCoordsToGrid.ts';

interface TodayWeatherProps {
    classifedWeather: Map<Code, Weather[]> | undefined;
    codes: Code[];
}
const TodayWeather = (props: TodayWeatherProps) => {
    const [address, setAddress] = useState<string>();
    const { codes, classifedWeather } = props;
    // eslint-disable-next-line array-callback-return
    const tmps = classifedWeather?.get(codes[0])?.filter((item) => {
        if (YYYYMMDD() + nowHours().toString() <= item.fcstDate + item.fcstTime)
            return item;
    });
    // eslint-disable-next-line array-callback-return
    const skys = classifedWeather?.get(codes[1])?.filter((item) => {
        if (YYYYMMDD() + nowHours().toString() <= item.fcstDate + item.fcstTime)
            return item;
    });
    // eslint-disable-next-line array-callback-return
    const tmxs = classifedWeather?.get(codes[2])?.filter((item) => {
        if (YYYYMMDD() + nowHours().toString() <= item.fcstDate + item.fcstTime)
            return item;
    });
    // eslint-disable-next-line array-callback-return
    const tmns = classifedWeather?.get(codes[3])?.filter((item) => {
        if (YYYYMMDD() + nowHours().toString() <= item.fcstDate + item.fcstTime)
            return item;
    });
    const navermaps = useNavermaps();
    const latlong = skys && dfs_xy_conv("not", skys[0].nx, skys[0].ny)! as { lat: number, lng: number };

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
        setAddress(address.jibunAddress);
    });
    return (
        <div className='absolute top-0 w-full flex flex-col items-center  bg-main-color text-white py-2 px-1 h-1/2'>
            {tmps && skys && tmxs && tmns && (
                <>
                    <h1 className='text-2xl font-normal'>{address?.slice(4, 11)}</h1>
                    <h4 className='text-base font-normal'>{sky[skys[0].fcstValue]}</h4>
                    <div className='p-4 text-8xl font-extrabold animate-[wiggle_1.5s_ease-in-out_infinite]'>
                        <Icon isNight={'1800' <= tmps[0].fcstTime || '0700' > tmps[0].fcstTime} skyState={Number(skys[0].fcstValue)} />
                    </div>

                    <div className='p-4'>
                        <div className="relative">
                            <div className="relative p-3 text-4xl font-bold">
                                <h1>
                                    {tmps[0].fcstValue}
                                </h1>
                                <div className="absolute right-0 top-0">
                                    <FontAwesomeIcon className='text-[10px] font-extrabold' icon={faO} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className="relative p-3 text-sm">
                            <span>
                                {`최고 ${tmxs[0].fcstValue}`}
                            </span>
                            <div className="absolute right-0 top-0">
                                <FontAwesomeIcon className='text-[7px] font-extrabold' icon={faO} />
                            </div>
                        </div>
                        <span>/</span>
                        <div className="relative p-3 text-sm">
                            <span>
                                {`최저 ${tmns[0].fcstValue}`}
                            </span>
                            <div className="absolute right-0 top-0">
                                <FontAwesomeIcon className='text-[7px] font-extrabold' icon={faO} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default TodayWeather;