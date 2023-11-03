import React from 'react';
import { useState, useRef } from 'react';
import { NaverMap, useNavermaps, useListener, Overlay, Listener } from 'react-naver-maps';

const Marker = (props) => {
    // ��Ŀ�� �ѹ��� �����ϱ� ���� useState lazy initialize ���
    const navermaps = useNavermaps()//�ߺ���.(&)

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
    useListener(marker1, 'click', () => window.alert('�����û click'))

    return (
        <NaverMap
            defaultZoom={10}
        >
            <Overlay element={marker1} />
            <Overlay element={marker2}>
                {/* Component �� �̺�Ʈ ������ ��� */}
                <Listener
                    type="click"
                    listener={() => window.alert('popo click')}
                />
            </Overlay>
        </NaverMap>
    )
}

export default Marker;