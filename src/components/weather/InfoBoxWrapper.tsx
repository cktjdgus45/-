import InfoBox from './InfoBox.tsx';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Code, Weather, YYYYMMDD, nowHours } from '../../data/weather.ts';


interface InfoBoxWrapperProps {
    classifedWeather: Map<Code, Weather[]> | undefined;
    codes: Code[];
}

const OFFSET = 6;

const rowVariants = {
    hidden: (back: boolean) => (
        {
            opacity: 0,
            x: back ? -window.outerWidth : window.outerWidth
        }
    ),
    visible: () => (
        {
            opacity: 1,
            x: 0
        }
    ),
    exit: (back: boolean) => (
        {
            opacity: 0,
            x: back ? window.outerWidth : -window.outerWidth
        }
    )
}

const InfoBoxWrapper = (props: InfoBoxWrapperProps) => {
    const [page, setPage] = useState(0);
    const [back, setBack] = useState(false);
    const prevPage = () => {
        const maxPage = Math.floor(tmpsky.length / OFFSET) - 1;
        setPage(prev => prev > 0 ? page - 1 : maxPage);
        setBack(true);
    }

    const nextPage = () => {
        const maxPage = Math.floor(tmpsky.length / OFFSET) - 1;
        setPage(prev => prev === maxPage ? 0 : prev + 1);
        setBack(false);
    }
    const { codes, classifedWeather } = props;
    // eslint-disable-next-line array-callback-return

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
    const tmpsky: { tmp: Weather, sky: Weather }[] = [];
    if (tmps && skys) {
        for (let idx = 0; idx < tmps.length; idx++) {
            const tmp = tmps[idx];
            const sky = skys[idx];
            tmpsky.push({ tmp, sky });
        }
    }

    return (
        <AnimatePresence initial={false}>
            <div className='relative w-full h-full'>
                <motion.div custom={back} variants={rowVariants} initial="hidden" animate="visible" exit="exit" transition={{ type: "tween", duration: 1 }} key={page} className='grid w-full h-32 grid-cols-6 absolute bottom-1/4'>
                    {
                        tmpsky.slice(OFFSET * page, OFFSET * page + OFFSET).map((item, i) => (
                            <InfoBox key={i} tmp={item.tmp} sky={item.sky} />
                        ))
                    }
                </motion.div>
                <FontAwesomeIcon className='text-white absolute left-0 bottom-[26%] cursor-pointer text-3xl font-bold ' onClick={prevPage} icon={faArrowLeft} />
                <FontAwesomeIcon className='text-white absolute right-0 bottom-[26%] cursor-pointer text-3xl font-bold ' onClick={nextPage} icon={faArrowRight} />
            </div>
        </AnimatePresence>
    )
}
export default InfoBoxWrapper;