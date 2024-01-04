import React, { memo } from 'react';

interface BannerProps {
  text: string;
  isAlert: boolean;
}

const Banner = memo(({ text, isAlert }: BannerProps) => (
  <>
    {text && (
      <p className={`m-2 p-2 text-base font-bold ${isAlert ? 'bg-red-400' : 'bg-green-400'}`}>
        {text}
      </p>
    )}
  </>
));
export default Banner;
