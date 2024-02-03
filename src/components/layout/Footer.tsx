import React from 'react';

const Footer = () => {
    return (
        <footer className='w-full bg-sub-color basis-2/10 flex justify-around px-8 items-center'>
            <div className='flex-col items-center'>
                <img alt='logo' src={process.env.PUBLIC_URL + '/logo.png'} />
                <p className='mt-2 text-xs text-main-color font-normal'>@2023오늘도안전하개 All rights reserved</p>
            </div>
            <img className='bg-contain bg-center w-[200px] h-[140px]' src={process.env.PUBLIC_URL + '/bone.png'} alt="bone" />
        </footer>
    )
}

export default Footer;