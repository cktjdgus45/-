/* eslint-disable no-mixed-operators */
import React from 'react';
interface IconProps {
    skyState: number;
    ptyState: number;
    isNight: boolean;
}

const Icon = ({ skyState, isNight, ptyState }: IconProps) => {
    const publicUrl: string = process.env.PUBLIC_URL ?? '';
    return (
        <>
            {
                ptyState ? (
                    <>
                        {ptyState === 1 && (<img className='w-20 h-20' alt='logo' src={publicUrl + (isNight ? '/partly-cloudy-night-rain.svg' : '/partly-cloudy-day-rain.svg')} />)}
                        {ptyState === 2 && (<img className='w-20 h-20' alt='logo' src={publicUrl + (isNight ? '/partly-cloudy-night-sleet.svg' : '/partly-cloudy-day-sleet.svg')} />)}
                        {ptyState === 3 && (<img className='w-20 h-20' alt='logo' src={publicUrl + (isNight ? '/partly-cloudy-night-snow.svg' : '/partly-cloudy-day-snow.svg')} />)}
                        {ptyState === 4 && (<img className='w-20 h-20' alt='logo' src={publicUrl + (isNight ? '/partly-cloudy-night-rain.svg' : '/partly-cloudy-day-rain.svg')} />)}
                    </>

                ) : (
                    <>
                        {skyState === 1 && (<img className='w-20 h-20' alt='logo' src={publicUrl + (isNight ? '/clear-night.svg' : '/clear-day.svg')} />)}
                        {skyState === 3 && (<img className='w-20 h-20' alt='logo' src={publicUrl + (isNight ? '/overcast-night.svg' : '/overcast-day.svg')} />)}
                        {skyState === 4 && (<img className='w-20 h-20' alt='logo' src={publicUrl + (isNight ? '/partly-cloudy-night-smoke.svg' : '/partly-cloudy-day-smoke.svg')} />)}
                    </>
                )
            }
        </>
    )
}

export default Icon;