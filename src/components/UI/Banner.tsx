import React, { memo, useEffect, useState } from 'react';

interface BannerProps {
  text: string;
  isAlert: boolean;
}

const Banner = memo(({ text, isAlert }: BannerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      {isVisible && text && (
        <div className={`z-50 fixed w-64 left-[44%]  text-center top-0 transform p-1 text-base font-light ${isAlert ? 'bg-red-400' : 'bg-green-400'} transition-transform ease-in-out duration-300 slide-up`}>
          {text}
        </div>
      )}
    </>

  )
}
);
export default Banner;
