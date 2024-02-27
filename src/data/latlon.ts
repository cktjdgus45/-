
//latitude,longtitude
export type Coord = {
    lat: number;
    lng: number;
}

export type Hospital = {
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
    x: number; //lat
    y: number;//lng
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


