import React from "react";
import { useRef } from "react";
import { Overlay, Listener, useNavermaps } from "react-naver-maps";

import { Coord, Hospital } from "../data/latlon";

interface MarkerProps {
    coord: Coord;
    map: naver.maps.Map | null;
    hospital: Hospital;
    infowindow: naver.maps.InfoWindow | null;
}

const Marker = (props: MarkerProps) => {
    const navermaps = useNavermaps();
    const {
        coord: { lat, lng },
        map,
        hospital,
        infowindow,
    } = props;
    const marker2Ref = useRef<naver.maps.Marker | null>(null);
    if (!marker2Ref.current) {
        marker2Ref.current = new navermaps.Marker({
            position: { lat, lng },
        });
    }
    const marker2 = marker2Ref.current;
    const handleMarkerClick = () => {
        infowindow?.setContent(
            `
            <div style="padding:5px;">
            <h5 style="">${hospital.name}</h5>
            <h5 style="">${hospital.jibunAdress}</h5>
            <h5 style="">${hospital.phone}</h5>
            </div>
            `,
        );
        if (map) {
            infowindow?.open(map, { lat, lng });
        }
    };
    return (
        <>
            <Overlay element={marker2}>
                <Listener type="click" listener={handleMarkerClick} />
            </Overlay>
        </>
    );
};

export default Marker;
