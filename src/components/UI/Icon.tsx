/* eslint-disable no-mixed-operators */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faSmog, faCloudShowersHeavy, faCloudMoon, faCloudMoonRain, faMoon } from '@fortawesome/free-solid-svg-icons';

interface IconProps {
    skyState: number;
    isNight: boolean;
}

const Icon = ({ skyState, isNight }: IconProps) => {
    return (
        <>
            {skyState === 1 && <FontAwesomeIcon icon={!isNight ? faSun : faMoon} />}
            {skyState === 2 && <FontAwesomeIcon icon={!isNight ? faCloudShowersHeavy : faCloudMoonRain} />}
            {skyState === 3 && <FontAwesomeIcon icon={faSmog} />}
            {skyState === 4 && <FontAwesomeIcon icon={!isNight ? faCloud : faCloudMoon} />}
        </>
    )
}

export default Icon;