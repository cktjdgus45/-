export type Code = "TMP" | "TMN" | "TMX" | "SKY" | "PTY" | "PCP" | "POP";
export type PTY = {
    0: "¾øÀ½",
    1: "ºñ",
    2: "ºñ/´«",
    3: "´«",
    4: "¼Ò³ª±â",
}

export type FcstTime = "0600" | "0700" | "0800" | "0900" | "1000" | "1100" | "1200" | "1300" | "1400" | "1500" | "1600" | "1700" | "1800" | "1900" | "2000" | "2100" | "2200" | "2300" | "0000";

export type SKY = {
    1: "¸¼À½",
    2: "ºñ/´«",
    3: "±¸¸§¸¹À½",
    4: "Èå¸²",
}

export type resWeatherData = {
    "baseDate": string,
    "baseTime": "0500",
    "category": Code,
    "fcstDate": string,
    "fcstTime": FcstTime,
    "fcstValue": string,
    "nx": number,
    "ny": number
}

export const YYYYMMDD = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const todayDate = `${year}${month}${day}`;
    return parseInt(todayDate);
}

export const weatherApiWithGridXY = (ny: number, nx: number) => {
    return `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?ServiceKey=${process.env.REACT_APP_WEAHTER_ServiceKey}&pageNo=1&numOfRows=10&dataType=JSON&base_date=${YYYYMMDD()}&base_time=0500&nx=${ny}&ny=${nx}`.trim();
}

export const pcp = (rain: number) => { //°­¼ö·®
    if (rain < 1.0) return "1.0mm¹Ì¸¸ ";

    else if (rain >= 1.0 && rain < 30.0) return "1.0~29.0mm";

    else if (rain >= 30.0 && rain < 50.0) return "30.0~50.0mm";

    else return "50.0mmÀÌ»ó";
}