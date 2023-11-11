export type Coord = {
    lat: number;
    lng: number;
}

export type Hospital = {
    name: string;
    phone: string;
    jibunAdress: string;
    coord: Coord;
}

export const coords: Coord[] = [
    {
        lat: 37.223313,
        lng: 126.952805
    },
    {
        lat: 37.224726,
        lng: 126.947334
    },
];

export const hospitals: Hospital[] = [
    {
        name: 'a병원',
        phone: '010-0111-1111',
        jibunAdress: '경기도 화성시 봉담읍 10-35',
        coord: {
            lat: 37.223313,
            lng: 126.952805
        }
    },
    {
        name: 'b병원',
        phone: '010-0000-2222',
        jibunAdress: '경기도 화성시 봉담읍 11-10',
        coord: {
            lat: 37.224726,
            lng: 126.947334
        }
    },
]
