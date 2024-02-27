import React from 'react';

const Footer = () => {
    return (
        <footer className='w-full bg-sub-color basis-2/10 flex justify-around px-8 items-center'>
            <div className='flex-col items-center'>
                <img alt='로고이미지' src={process.env.PUBLIC_URL + '/logo.png'} />
                <p>
                    <p className='mt-2 text-xs text-main-color font-normal'>@2023오늘도안전하개 All rights reserved</p>
                </p>
            </div>
            <div>
                <img className='bg-contain bg-center w-[200px] h-[140px]' src={process.env.PUBLIC_URL + '/bone.png'} alt="강아지 뼈다귀 사진" />
            </div>
        </footer>
    )
}

export default Footer;