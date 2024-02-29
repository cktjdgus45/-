/* eslint-disable no-self-compare */
import React from 'react';
import { Weather } from '../../data/weather';
import Icon from '../weather/weatherIcon.tsx';
import { motion } from 'framer-motion';

interface InfoBoxProps {
    tmp: Weather;
    sky: Weather;
    pty: Weather;
}
const InfoBox = ({ tmp, sky, pty }: InfoBoxProps) => {


    return (
        <motion.div
            className="flex flex-col items-center bg-main-color text-white py-2 px-1 h-full"
        >
            <div className='p-2 text-xs mobile:text-xl'>
                {'1200' <= tmp.fcstTime || '0000' > tmp.fcstTime ? ` 오후 ${tmp.fcstTime === "1200" ? Number(tmp.fcstTime.slice(0, 2)) : (Number(tmp.fcstTime.slice(0, 2)) % 12)}시` : `오전 ${tmp.fcstTime.slice(0, 2)}시`}
            </div>
            <div className='p-2 text-5xl'>
                <Icon isNight={'1800' <= tmp.fcstTime || '0700' > tmp.fcstTime} skyState={Number(sky.fcstValue)} ptyState={Number(pty.fcstValue)} />
            </div>
            <div className='absolute top-0 text-xs font-extralight'>
                {tmp.fcstTime === '0000' && <h2 className='text-sm'>{`${tmp.fcstDate.slice(4, 6)}월${tmp.fcstDate.slice(6, 8)}일`}</h2>}
            </div>
            <div className='p-3'>
                <div className="">
                    <div className=" p-2 text-base mobile:text-xl">
                        <span>
                            {tmp.fcstValue}°
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default InfoBox;