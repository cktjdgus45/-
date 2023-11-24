import React from 'react';
import { Code, MiseDust, Weather, YYYYMMDD, miseDustWithStationName, nowHours, resMiseData, sky, stationNameWithTmxTmy, tmxTmyCoordsWithAddress } from '../../data/weather.ts';
import Icon from '../weather/weatherIcon.tsx';
import useSWR from 'swr';
import { fetcher } from '../../network/fetcher.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import Loader from '../UI/Loader.tsx';

interface TodayWeatherProps {
    classifedWeather: Map<Code, Weather[]> | undefined;
    codes: Code[];
}
const TodayWeather = (props: TodayWeatherProps) => {
    const storeValue2 = useSelector((state: RootState) => state.address);
    const { name } = storeValue2;

    // const [address, setAddress] = useState<string>();
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
    // eslint-disable-next-line array-callback-return
    const ptys = classifedWeather?.get(codes[4])?.filter((item) => {
        if (YYYYMMDD() + nowHours().toString() <= item.fcstDate + item.fcstTime)
            return item;
    });

    const { data: tmxtmy } = useSWR(tmxTmyCoordsWithAddress(name?.slice(8, 11)! as string), fetcher);
    const { data: stationName } = useSWR(tmxtmy ? stationNameWithTmxTmy(tmxtmy.response.body.items[0]["tmX"], tmxtmy.response.body.items[0]["tmY"]) : null, fetcher);
    const { data: miseDust, isLoading } = useSWR<resMiseData>(stationName ? miseDustWithStationName(stationName.response.body.items[0]["stationName"]) : null, fetcher);
    return (
        <div className='absolute top-0 w-full flex flex-col items-center  bg-main-color text-white py-2 px-1 h-1/2'>
            <div className=' absolute right-0 bottom-0 bg-slate-300 flex'>
                {isLoading ? (<Loader isLoading={isLoading} color='#776B5D' />) : (
                    <>
                        <div>
                            {miseDust?.response.body.items[0].pm10Grade}10grade
                            {miseDust?.response.body.items[0].pm10Value}10value
                        </div>
                        <div>
                            {miseDust?.response.body.items[0].pm25Grade}25grade
                            {miseDust?.response.body.items[0].pm25Value}25value
                        </div>
                    </>
                )}
            </div>
            {tmps && skys && tmxs && tmns && ptys && (
                <>
                    <h1 className='text-2xl font-normal'>{name?.slice(7, 11).trim()}</h1>
                    <h4 className='text-base font-normal'>{sky[skys[0].fcstValue]}</h4>
                    <div className='p-4 text-8xl font-extrabold'>
                        <Icon isNight={'1800' <= tmps[0].fcstTime || '0700' > tmps[0].fcstTime} skyState={Number(skys[0].fcstValue)} ptyState={Number(ptys[0].fcstValue)} />
                    </div>

                    <div className='p-4'>
                        <div className="">
                            <div className=" p-3 text-4xl font-bold">
                                <h1>
                                    {tmps[0].fcstValue}°
                                </h1>

                            </div>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className=" p-3 text-sm">
                            <span>
                                {`최고 ${tmxs[0].fcstValue}°`}
                            </span>

                        </div>
                        <span>/</span>
                        <div className=" p-3 text-sm">
                            <span>
                                {`최저 ${tmns[0].fcstValue}°`}
                            </span>

                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default TodayWeather;