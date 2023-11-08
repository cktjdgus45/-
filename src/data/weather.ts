export type Code = "TMP" | "TMN" | "TMX" | "SKY" | "PTY" | "PCP" | "POP";
export type PTY = {
    0: "����",
    1: "��",
    2: "��/��",
    3: "��",
    4: "�ҳ���",
}

export type FcstTime = "0600" | "0700" | "0800" | "0900" | "1000" | "1100" | "1200" | "1300" | "1400" | "1500" | "1600" | "1700" | "1800" | "1900" | "2000" | "2100" | "2200" | "2300" | "0000";

export type SKY = {
    1: "����",
    2: "��/��",
    3: "��������",
    4: "�帲",
}

export type weatherData = {
    "baseDate": string,
    "baseTime": "0500",
    "category": Code,
    "fcstDate": string,
    "fcstTime": FcstTime,
    "fcstValue": string,
    "nx": number,
    "ny": number
}

export const pcp = (rain: number) => { //������
    if (rain < 1.0) return "1.0mm�̸� ";

    else if (rain >= 1.0 && rain < 30.0) return "1.0~29.0mm";

    else if (rain >= 30.0 && rain < 50.0) return "30.0~50.0mm";

    else return "50.0mm�̻�";
}