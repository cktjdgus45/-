import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Container as MapDiv, NaverMap, useNavermaps, InfoWindow, useListener, Overlay, Listener } from 'react-naver-maps';

export default function MyMap() {
    const navermaps = useNavermaps()

    // ��Ŀ�� �ѹ��� �����ϱ� ���� useState lazy initialize ���
    const [marker1] = useState(
        () =>
            new navermaps.Marker({
                position: { lat: 37.2186019, lng: 126.9536571 },
            }),
    )
    // ��Ŀ�� �ѹ��� �����ϱ� ���� useRef ���
    const marker2Ref = useRef<naver.maps.Marker | null>(null);
    if (!marker2Ref.current) {
        marker2Ref.current = new navermaps.Marker({
            position: { lat: 37.2186019, lng: 126.9536571 },
        });
    }
    const marker2 = marker2Ref.current
    const [map, setMap] = useState<naver.maps.Map | null>(null)
    const [infowindow, setInfoWindow] = useState<naver.maps.InfoWindow | null>(null)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function onSuccessGeolocation(position) {
        if (!map || !infowindow) return

        const location = new navermaps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
        )

        naver.maps.Service.fromCoordToAddr({ coords: location }, function (status, response) {
            if (status !== naver.maps.Service.Status.OK) {
                return alert('Something wrong!');
            }

            var result = response.v2, // �˻� ����� �����̳�
                address = result.address; // �˻� ����� ���� �ּ�
            console.log(result, address, location);

            // do Something
            infowindow.setContent(
                '<div style="padding:10px;">' +
                `${address.jibunAddress}` +
                '</div>',
            )
        });

        map.setCenter(location);
        map.setZoom(10);
        // infowindow.setContent(
        //     '<div style="padding:10px;">' +
        //     `${location.toString()}` +
        //     '</div>',
        // )
        infowindow.setPosition(location);
        infowindow.open(map, location) //����â�� ���ϴ�.
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function onErrorGeolocation() {
        if (!map || !infowindow) return

        const center = map.getCenter()
        infowindow.setContent(
            '<div style="padding:20px;">' +
            '<h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>' +
            'latitude: ' +
            center.x +
            '<br />longitude: ' +
            center.y +
            '</div>',
        )
        infowindow.open(map, center)

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                onSuccessGeolocation,
                onErrorGeolocation,
            )
        } else {
            const center = map.getCenter()
            infowindow.setContent(
                '<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>',
            )
            infowindow.open(map, center)
        }
    }
    useListener(marker1, 'click', () => window.alert('�����û click'))
    useEffect(() => {
        if (!map || !infowindow) {
            return
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                onSuccessGeolocation,
                onErrorGeolocation,
            )
        } else {
            var center = map.getCenter()
            infowindow.setContent(
                '<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>',
            )
            infowindow.open(map, center)
        }
    }, [map, infowindow, onSuccessGeolocation, onErrorGeolocation])

    return (
        <MapDiv
            style={{
                position: 'relative',
                width: '100%',
                height: '600px',
            }}
        >
            <NaverMap
                defaultCenter={new navermaps.LatLng(37.5666805, 126.9784147)}
                defaultZoom={10}
                defaultMapTypeId={navermaps.MapTypeId.NORMAL}
                ref={setMap}
            >
                <InfoWindow ref={setInfoWindow} content={'�� ��ġ'} />
                <Overlay element={marker1} />
                <Overlay element={marker2}>
                    {/* Component �� �̺�Ʈ ������ ��� */}
                    <Listener
                        type="click"
                        listener={() => window.alert('popo click')}
                    />
                </Overlay>
            </NaverMap>
        </MapDiv>
    )
}

