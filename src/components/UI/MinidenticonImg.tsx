import React, { useMemo } from 'react';

//@ts-ignore
import { minidenticon } from "https://cdn.jsdelivr.net/npm/minidenticons@4.2.0/minidenticons.min.js";

interface MinidenticonImgProps {
  username: string;
  saturation: string;
  width: string;
  height: string;
}

const MinidenticonImg = ({ username, saturation, ...props }: MinidenticonImgProps) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(username, saturation)),
    [username, saturation]
  );
  return (
    <>
      <img className='bg-main-color rounded-full' src={svgURI} alt={username} {...props} />

    </>
  )
}

export default MinidenticonImg;