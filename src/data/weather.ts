export type Code = "TMP" | "TMN" | "TMX" | "SKY" | "PTY" | "PCP" | "POP";
export type PTY = {
    0: "없음",
    1: "비",
    2: "비/눈",
    3: "눈",
    4: "소나기",
}
const SKY = {
    1: "맑음",
    3: "구름많음",
    4: "흐림",
}

export const sky = { ...SKY };
const myMap: Map<Code, Weather[]> = new Map();
myMap.set("TMP", []);
myMap.set("TMN", []);
myMap.set("TMX", []);
myMap.set("SKY", []);
myMap.set("PTY", []);
myMap.set("PCP", []);
myMap.set("POP", []);


export const weathersClassifiedWithCatergory = (element: Weather) => {
    for (const [key, value] of myMap) {
        if (value.length === 84) {
            value.splice(0, value.length / 2);
        }
        if (key === "PCP" && value.length === 42) {
            value.splice(0, value.length / 2);
        }
        if (key === "TMX" && value.length === 4) {
            value.splice(0, value.length / 2);
        }
        if (key === "TMN" && value.length === 2) {
            value.splice(0, value.length / 2);
        }
        if (element.category === key) {
            value.push(element);
        }
    }
    return myMap;
}

export type Weather = {
    "baseTime": string,
    "category": Code,
    "fcstDate": string,
    "fcstTime": string,
    "fcstValue": string,
    "nx": number,
    "ny": number,
}

export type FcstTime = "0600" | "0700" | "0800" | "0900" | "1000" | "1100" | "1200" | "1300" | "1400" | "1500" | "1600" | "1700" | "1800" | "1900" | "2000" | "2100" | "2200" | "2300" | "0000";


export type resWeatherData = {
    "response": {
        body: {
            items: {
                item: Weather[]
            };
        }
    }
}

export const miseGrade = {
    1: '좋음',
    2: '보통',
    3: '나쁨',
    4: '매우나쁨',
}

export type MiseDust = {
    dataTime: string;
    pm10Grade: string;
    pm10Value: string;
    pm25Grade: string;
    pm25Value: string;
}
export type resMiseData = {
    response: {
        body: {
            items: MiseDust[];
        }
    }
}






export const YYYYMMDD = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const todayDate = `${year}${month}${day}`;
    return parseInt(todayDate);
}

export const nowHours = () => {
    let now = new Date();
    let hours: string | number = now.getHours();

    hours = hours < 10 ? '0' + hours : hours;

    let time = '' + hours + "00";
    return time;
}

export const weatherApiWithGridXY = (ny: number, nx: number) => { //기상청
    return `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?ServiceKey=${process.env.REACT_APP_WEAHTER_ServiceKey}&pageNo=${1}&numOfRows=${505}&dataType=${'JSON'}&base_date=${YYYYMMDD()}&base_time=${'0500'}&nx=${ny}&ny=${nx}`.trim();
}

export const tmxTmyCoordsWithAddress = (address: string) => {
    return `https://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getTMStdrCrdnt?serviceKey=${process.env.REACT_APP_WEAHTER_ServiceKey}&returnType=${'json'}&numOfRows=${100}&pageNo=${1}&umdName=${address}`.trim();
}

export const stationNameWithTmxTmy = (tmx: string, tmy: string) => {
    return `https://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList?serviceKey=${process.env.REACT_APP_WEAHTER_ServiceKey}&returnType=${'json'}&tmX=${Number(tmx)}6&tmY=${Number(tmy)}&ver=${1.1}`.trim();
}

export const miseDustWithStationName = (stationName: string) => {
    return `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${process.env.REACT_APP_WEAHTER_ServiceKey}&returnType=${'json'}&numOfRows=${100}&pageNo=${1}&stationName=${stationName}&dataTerm=${'DAILY'}&ver=${'1.0'}`;
}

export const pcp = (rain: number) => { //강수량
    if (rain < 1.0) return "1.0mm미만 ";

    else if (rain >= 1.0 && rain < 30.0) return "1.0~29.0mm";

    else if (rain >= 30.0 && rain < 50.0) return "30.0~50.0mm";

    else return "50.0mm이상";
}

