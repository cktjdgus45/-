import React from 'react';
import { useState, useRef } from 'react';
import { NaverMap, useNavermaps, useListener, Overlay, Listener } from 'react-naver-maps';

const Marker = (props) => {
    // 마커를 한번만 생성하기 위해 useState lazy initialize 사용
    const navermaps = useNavermaps()//중복됨.(&)

    const [marker1] = useState(
        () =>
            new navermaps.Marker({
                position: { lat: 37.2186019, lng: 126.9536571 },
            }),
    )
    // 마커를 한번만 생성하기 위해 useRef 사용
    const marker2Ref = useRef<naver.maps.Marker | null>(null);
    if (!marker2Ref.current) {
        marker2Ref.current = new navermaps.Marker({
            position: { lat: 37.2186019, lng: 126.9536571 },
        });
    }
    const marker2 = marker2Ref.current
    useListener(marker1, 'click', () => window.alert('서울시청 click'))

    return (
        <NaverMap
            defaultZoom={10}
        >
            <Overlay element={marker1} />
            <Overlay element={marker2}>
                {/* Component 로 이벤트 리스너 등록 */}
                <Listener
                    type="click"
                    listener={() => window.alert('popo click')}
                />
            </Overlay>
        </NaverMap>
    )
}

export default Marker;