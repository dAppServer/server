import assertString from "./util/assertString.ts";

const validators: any = {
  ES: (str: string) => {
    assertString(str);

    const DNI = /^[0-9X-Z][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;

    const charsValue: any = {
      X: 0,
      Y: 1,
      Z: 2,
    };

    const controlDigits = [
      "T",
      "R",
      "W",
      "A",
      "G",
      "M",
      "Y",
      "F",
      "P",
      "D",
      "X",
      "B",
      "N",
      "J",
      "Z",
      "S",
      "Q",
      "V",
      "H",
      "L",
      "C",
      "K",
      "E",
    ];

    // sanitize user input
    const sanitized = str.trim().toUpperCase();

    // validate the data structure
    if (!DNI.test(sanitized)) {
      return false;
    }

    // validate the control digit
    const number = sanitized.slice(0, -1).replace(
      /[X,Y,Z]/g,
      (char) => charsValue[char],
    );

    return sanitized.endsWith(controlDigits[Number(number) % 23]);
  },
  IN: (str: string) => {
    const DNI = /^[1-9]\d{3}\s?\d{4}\s?\d{4}$/;

    // multiplication table
    const d = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    ];

    // permutation table
    const p = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
    ];

    // sanitize user input
    const sanitized = str.trim();

    // validate the data structure
    if (!DNI.test(sanitized)) {
      return false;
    }
    let c = 0;
    let invertedArray = sanitized.replace(/\s/g, "").split("").map(Number)
      .reverse();

    invertedArray.forEach((val, i) => {
      c = d[c][p[(i % 8)][val]];
    });

    return c === 0;
  },
  IR: (str: string) => {
    if (!str.match(/^\d{10}$/)) return false;
    str = (`0000${str}`).substr(str.length - 6);

    if (parseInt(str.substr(3, 6), 10) === 0) return false;

    const lastNumber = parseInt(str.substr(9, 1), 10);
    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(str.substr(i, 1), 10) * (10 - i);
    }

    sum %= 11;

    return (
      (sum < 2 && lastNumber === sum) || (sum >= 2 && lastNumber === 11 - sum)
    );
  },
  IT: function IT(str: string) {
    if (str.length !== 9) return false;
    if (str === "CA00000AA") return false; // https://it.wikipedia.org/wiki/Carta_d%27identit%C3%A0_elettronica_italiana
    return str.search(/C[A-Z]\d{5}[A-Z]{2}/is) > -1;
  },
  NO: (str: string) => {
    const sanitized = str.trim();
    if (isNaN(Number(sanitized))) return false;
    if (sanitized.length !== 11) return false;
    if (sanitized === "00000000000") return false;

    // https://no.wikipedia.org/wiki/F%C3%B8dselsnummer
    const f = sanitized.split("").map(Number);
    let k1 = (11 - (((3 * f[0]) + (7 * f[1]) + (6 * f[2]) +
      (1 * f[3]) + (8 * f[4]) + (9 * f[5]) + (4 * f[6]) +
      (5 * f[7]) + (2 * f[8])) % 11)) % 11;
    let k2 = (11 - (((5 * f[0]) + (4 * f[1]) + (3 * f[2]) +
      (2 * f[3]) + (7 * f[4]) + (6 * f[5]) + (5 * f[6]) +
      (4 * f[7]) + (3 * f[8]) + (2 * k1)) % 11)) % 11;

    if (k1 !== f[9] || k2 !== f[10]) return false;
    return true;
  },
  "he-IL": (str: string) => {
    const DNI = /^\d{9}$/;

    // sanitize user input
    const sanitized = str.trim();

    // validate the data structure
    if (!DNI.test(sanitized)) {
      return false;
    }

    const id = sanitized;

    let sum = 0,
      incNum;
    for (let i = 0; i < id.length; i++) {
      incNum = Number(id[i]) * ((i % 2) + 1); // Multiply number by 1 or 2
      sum += incNum > 9 ? incNum - 9 : incNum; // Sum the digits up and add to total
    }
    return sum % 10 === 0;
  },
  "ar-LY": (str: string) => {
    // Libya National Identity Number NIN is 12 digits, the first digit is either 1 or 2
    const NIN = /^(1|2)\d{11}$/;

    // sanitize user input
    const sanitized = str.trim();

    // validate the data structure
    if (!NIN.test(sanitized)) {
      return false;
    }
    return true;
  },
  "ar-TN": (str: string) => {
    const DNI = /^\d{8}$/;

    // sanitize user input
    const sanitized = str.trim();

    // validate the data structure
    if (!DNI.test(sanitized)) {
      return false;
    }
    return true;
  },
  "zh-CN": (str: string) => {
    const provincesAndCities = [
      "11", // 北京
      "12", // 天津
      "13", // 河北
      "14", // 山西
      "15", // 内蒙古
      "21", // 辽宁
      "22", // 吉林
      "23", // 黑龙江
      "31", // 上海
      "32", // 江苏
      "33", // 浙江
      "34", // 安徽
      "35", // 福建
      "36", // 江西
      "37", // 山东
      "41", // 河南
      "42", // 湖北
      "43", // 湖南
      "44", // 广东
      "45", // 广西
      "46", // 海南
      "50", // 重庆
      "51", // 四川
      "52", // 贵州
      "53", // 云南
      "54", // 西藏
      "61", // 陕西
      "62", // 甘肃
      "63", // 青海
      "64", // 宁夏
      "65", // 新疆
      "71", // 台湾
      "81", // 香港
      "82", // 澳门
      "91", // 国外
    ];

    const powers = [
      "7",
      "9",
      "10",
      "5",
      "8",
      "4",
      "2",
      "1",
      "6",
      "3",
      "7",
      "9",
      "10",
      "5",
      "8",
      "4",
      "2",
    ];

    const parityBit = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

    const checkAddressCode = (addressCode: string) =>
      provincesAndCities.includes(addressCode);

    const checkBirthDayCode = (birDayCode: string) => {
      const yyyy = parseInt(birDayCode.substring(0, 4), 10);
      const mm = parseInt(birDayCode.substring(4, 6), 10);
      const dd = parseInt(birDayCode.substring(6), 10);
      const xdata = new Date(yyyy, mm - 1, dd);
      if (xdata > new Date()) {
        return false;
        // eslint-disable-next-line max-len
      } else if (
        (xdata.getFullYear() === yyyy) && (xdata.getMonth() === mm - 1) &&
        (xdata.getDate() === dd)
      ) {
        return true;
      }
      return false;
    };

    const getParityBit = (idCardNo: string) => {
      let id17 = idCardNo.substring(0, 17);

      let power = 0;
      for (let i = 0; i < 17; i++) {
        power += parseInt(id17.charAt(i), 10) * parseInt(powers[i], 10);
      }

      let mod = power % 11;
      return parityBit[mod];
    };

    const checkParityBit = (idCardNo: string) =>
      getParityBit(idCardNo) === idCardNo.charAt(17).toUpperCase();

    const check15IdCardNo = (idCardNo: string) => {
      let check =
        /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/
          .test(idCardNo);
      if (!check) return false;
      let addressCode = idCardNo.substring(0, 2);
      check = checkAddressCode(addressCode);
      if (!check) return false;
      let birDayCode = `19${idCardNo.substring(6, 12)}`;
      check = checkBirthDayCode(birDayCode);
      if (!check) return false;
      return true;
    };

    const check18IdCardNo = (idCardNo: string) => {
      let check =
        /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/
          .test(idCardNo);
      if (!check) return false;
      let addressCode = idCardNo.substring(0, 2);
      check = checkAddressCode(addressCode);
      if (!check) return false;
      let birDayCode = idCardNo.substring(6, 14);
      check = checkBirthDayCode(birDayCode);
      if (!check) return false;
      return checkParityBit(idCardNo);
    };

    const checkIdCardNo = (idCardNo: string) => {
      let check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
      if (!check) return false;
      if (idCardNo.length === 15) {
        return check15IdCardNo(idCardNo);
      }
      return check18IdCardNo(idCardNo);
    };
    return checkIdCardNo(str);
  },
  "zh-TW": (str: string) => {
    const ALPHABET_CODES: any = {
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
      G: 16,
      H: 17,
      I: 34,
      J: 18,
      K: 19,
      L: 20,
      M: 21,
      N: 22,
      O: 35,
      P: 23,
      Q: 24,
      R: 25,
      S: 26,
      T: 27,
      U: 28,
      V: 29,
      W: 32,
      X: 30,
      Y: 31,
      Z: 33,
    };

    const sanitized = str.trim().toUpperCase();

    if (!/^[A-Z][0-9]{9}$/.test(sanitized)) return false;

    return Array.from(sanitized).reduce((sum: any, number: string, index: number) => {
      if (index === 0) {
        const code = ALPHABET_CODES[number];

        return ((code % 10) * 9) + Math.floor(code / 10);
      }

      if (index === 9) {
        return ((10 - (sum % 10)) - Number(number)) % 10 === 0;
      }

      return sum + (Number(number) * (9 - index));
    }, 0);
  },
};

export default function isIdentityCard(str: string, locale: string) {
  assertString(str);
  if (locale in validators) {
    return validators[locale](str);
  } else if (locale === "any") {
    for (const key in validators) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if (validators.hasOwnProperty(key)) {
        const validator = validators[key];
        if (validator(str)) {
          return true;
        }
      }
    }
    return false;
  }
  throw new Error(`Invalid locale '${locale}'`);
}
