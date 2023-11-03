import React from 'react';
import { useRef } from 'react';
import { Overlay, Listener, useNavermaps } from 'react-naver-maps';
import { Coord } from '../data/latlon';

interface MarkerProps {
    coord: Coord
}

const Marker = (props: MarkerProps) => {
    const navermaps = useNavermaps();
    const { coord: { lat, lng } } = props;
    const marker2Ref = useRef<naver.maps.Marker | null>(null);
    if (!marker2Ref.current) {
        marker2Ref.current = new navermaps.Marker({
            position: { lat, lng },
        });
    }
    const marker2 = marker2Ref.current

    return (
        <>
            <Overlay element={marker2}>
                <Listener
                    type="click"
                    listener={() => window.alert('popo click')}
                />
            </Overlay>
        </>
    )
}

export default Marker;