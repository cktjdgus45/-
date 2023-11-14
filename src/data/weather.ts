export type Code = "TMP" | "TMN" | "TMX" | "SKY" | "PTY" | "PCP" | "POP";
export type PTY = {
    0: "����",
    1: "��",
    2: "��/��",
    3: "��",
    4: "�ҳ���",
}

export type Weather = {
    "baseTime": "0500",
    "category": Code,
    "fcstDate": string,
    "fcstTime": "0600",
    "fcstValue": string,
}

export type FcstTime = "0600" | "0700" | "0800" | "0900" | "1000" | "1100" | "1200" | "1300" | "1400" | "1500" | "1600" | "1700" | "1800" | "1900" | "2000" | "2100" | "2200" | "2300" | "0000";

export type SKY = {
    1: "����",
    2: "��/��",
    3: "��������",
    4: "�帲",
}

export type resWeatherData = {
    "response": {
        body: {
            items: Weather[];
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

export const weatherApiWithGridXY = (ny: number, nx: number) => {
    console.log(ny, nx);
    return `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?ServiceKey=${process.env.REACT_APP_WEAHTER_ServiceKey}&pageNo=${1}&numOfRows=${505}&dataType=${'JSON'}&base_date=${YYYYMMDD()}&base_time=${'0500'}&nx=${ny}&ny=${nx}`.trim();
}

export const pcp = (rain: number) => { //������
    if (rain < 1.0) return "1.0mm�̸� ";

    else if (rain >= 1.0 && rain < 30.0) return "1.0~29.0mm";

    else if (rain >= 30.0 && rain < 50.0) return "30.0~50.0mm";

    else return "50.0mm�̻�";
}

