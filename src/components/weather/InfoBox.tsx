/* eslint-disable no-self-compare */
import React from 'react';
import { Weather } from '../../data/weather';
import { motion } from 'framer-motion';
import { faO } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon from '../UI/Icon.tsx';

interface InfoBoxProps {
    tmp: Weather;
    sky: Weather;
}
const InfoBox = ({ tmp, sky }: InfoBoxProps) => {


    return (
        <motion.div
            className="flex flex-col items-center bg-main-color text-white py-2 px-1 h-full"
        >
            <div className='p-4 text-xl'>
                {'1200' <= tmp.fcstTime || '0000' > tmp.fcstTime ? ` 오후 ${tmp.fcstTime === "1200" ? Number(tmp.fcstTime.slice(0, 2)) : (Number(tmp.fcstTime.slice(0, 2)) % 12)}시` : `오전 ${tmp.fcstTime.slice(0, 2)}시`}
            </div>
            <div className='p-4 text-5xl'>
                <Icon isNight={'1800' <= tmp.fcstTime || '0700' > tmp.fcstTime} skyState={Number(sky.fcstValue)} />
            </div>
            <div className='absolute top-1'>
                {tmp.fcstTime === '0000' && <h2 className='text-sm'>내일</h2>}
            </div>
            <div className='p-4 '>
                <div className="relative">
                    <div className="relative p-3 text-xl">
                        <span>
                            {tmp.fcstValue}
                        </span>
                        <div className="absolute right-0 top-0">
                            <FontAwesomeIcon className='text-[10px] font-extrabold' icon={faO} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default InfoBox;