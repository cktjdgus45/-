import React, { useMemo } from 'react';

//@ts-ignore
import { minidenticon } from "https://cdn.jsdelivr.net/npm/minidenticons@4.2.0/minidenticons.min.js";

interface MinidenticonImgProps {
  name: string;
  saturation: string;
  width: string;
  height: string;
}

const MinidenticonImg = ({ name, saturation, ...props }: MinidenticonImgProps) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(name, saturation)),
    [name, saturation]
  );
  return (
    <>
      <img className='bg-main-color rounded-full' src={svgURI} alt={name} {...props} />

    </>
  )
}

export default MinidenticonImg;