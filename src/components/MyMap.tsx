import React from 'react';
import { useState, useEffect } from 'react';
import { Container as MapDiv, NaverMap, useNavermaps, InfoWindow } from 'react-naver-maps';
import { hospitals } from '../data/latlon.ts';
import Marker from './Marker.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsSplitUpAndLeft } from '@fortawesome/free-solid-svg-icons';



export default function MyMap() {
    const navermaps = useNavermaps();
    const [map, setMap] = useState<naver.maps.Map | null>(null)
    const [infowindow, setInfoWindow] = useState<naver.maps.InfoWindow | null>(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function onSuccessGeolocation(position) {
        if (!map || !infowindow) return
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const location = new navermaps.LatLng(
            lat,
            lng
        )
        naver.maps.Service.fromCoordToAddr({ coords: location }, function (status, response) {
            if (status !== naver.maps.Service.Status.OK) {
                return alert('Something wrong!');
            }
            const result = response.v2;
            const address = result.address;
            infowindow.setContent(
                '<div style="padding:10px;">' +
                `${address.jibunAddress}` +
                '</div>',
            )
        });

        map.setCenter(location);
        map.setZoom(10);
        infowindow.setPosition(location);
        infowindow.open(map, location)
    }
    useEffect(() => {
        if (!map || !infowindow) {
            return
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                onSuccessGeolocation,
            )
        } else {
            const center = map.getCenter()
            infowindow.setContent(
                '<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>',
            )
            infowindow.open(map, center)
        }
    }, [infowindow, map, onSuccessGeolocation])

    return (
        <>
            <MapDiv
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                }}
            >
                <NaverMap
                    defaultCenter={new navermaps.LatLng(37.5666805, 126.9784147)}
                    defaultZoom={10}
                    defaultMapTypeId={navermaps.MapTypeId.NORMAL}
                    ref={setMap}
                >
                    <InfoWindow ref={setInfoWindow} content={''} />
                    {
                        hospitals.map((hospital) =>
                            <Marker coord={hospital.coord} map={map} hospital={hospital} infowindow={infowindow} />
                        )
                    }
                </NaverMap>
                <button className='absolute right-1 bottom-5 rounded-full transition-transform duration-300 ease-linear transform'>
                    <a href={'https://map.naver.com/p/directions/-/-/-/transit?c=13.00,0,0,0,dh'} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faArrowsSplitUpAndLeft} className='text-3xl text-main-color p-4 font-bold hover:scale-105 shadow-md rounded-full' />
                    </a>
                </button>
            </MapDiv>
        </>
    )
}


