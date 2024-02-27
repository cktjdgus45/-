import React, { useState } from 'react';
import { Code, Weather, YYYYMMDD, miseDustWithStationName, miseGrade, nowHours, resMiseData, sky, stationNameWithTmxTmy, tmxTmyCoordsWithAddress } from '../../data/weather.ts';
import MiseIcon from '../weather/miseIcon.tsx';
import Icon from '../weather/weatherIcon.tsx';
import useSWR from 'swr';
import { fetcher } from '../../network/fetcher.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from '../../components/UI/Loader.tsx';
interface TodayWeatherProps {
    classifedWeather: Map<Code, Weather[]> | undefined;
    codes: Code[];
}
const TodayWeather = (props: TodayWeatherProps) => {
    const jibunAddress = useSelector((state: RootState) => state.address);
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const { name } = jibunAddress;
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
        <div className='absolute top-0 w-full flex flex-col items-center  bg-main-color text-white px-1 h-1/2'>
            <motion.div layout key={selectedId} layoutId={"popo"} onClick={() => setSelectedId("popo")} className='cursor-pointer absolute z-50 right-1 bottom-1 bg-glass flex rounded-lg p-1'>
                {isLoading ? (<Loader kind='grid' isLoading={isLoading} color='#776B5D' />) : (
                    <div className='flex items-center'>
                        <MiseIcon miseGrade={miseDust?.response.body.items[0].pm10Grade} />
                        <div className='ml-2 text-sm'>
                            <p>미세먼지</p>
                            <p>{miseGrade[miseDust?.response.body.items[0].pm10Grade! as string]}</p>
                        </div>
                    </div>
                )}
            </motion.div>
            <AnimatePresence mode="wait" initial={false} >
                {selectedId && (
                    <motion.div layoutId={selectedId} onClick={() => setSelectedId(null)} className='flex justify-center absolute z-30 cursor-pointer w-full h-full bg-[rgba(0,0,0,0.7)]'>
                        <div className='w-1/2 h-full bg-glass flex flex-col items-center'>
                            <h5>{miseDust?.response.body.items[0].dataTime}</h5>
                            <h1 className='text-2xl font-normal mb-1'>{name?.slice(7, 11).trim()}</h1>
                            <MiseIcon miseGrade={miseDust?.response.body.items[0].pm10Grade} />
                            <p className='mt-1'>{miseGrade[miseDust?.response.body.items[0].pm10Grade! as string]}</p>
                            <div className="flex gap-3 mt-5 text-sm">
                                <div className="flex flex-col items-center">
                                    <h1 className='mb-1'>미세먼지</h1>
                                    <MiseIcon miseGrade={miseDust?.response.body.items[0].pm10Grade} />
                                    <p className='mt-1'>{miseGrade[miseDust?.response.body.items[0].pm10Grade! as string]}</p>
                                    <span>{miseDust?.response.body.items[0].pm10Value}
                                        <span className='text-xs font-base ml-1'>㎍/㎥</span>
                                    </span>
                                </div>
                                <motion.div className="flex flex-col items-center">
                                    <h1 className='mb-1'>초미세먼지</h1>
                                    <MiseIcon miseGrade={miseDust?.response.body.items[0].pm25Grade} />
                                    <p className='mt-1'>{miseGrade[miseDust?.response.body.items[0].pm25Grade! as string]}</p>
                                    <span>{miseDust?.response.body.items[0].pm25Value}
                                        <span className='text-xs font-base ml-1'>㎍/㎥</span>
                                    </span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
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