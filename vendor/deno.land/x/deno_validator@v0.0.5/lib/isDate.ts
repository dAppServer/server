import merge from "./util/merge.ts";

const default_date_options = {
  format: "YYYY/MM/DD",
  delimiters: ["/", "-"],
  strictMode: false,
};

function isValidFormat(format: string) {
  return /(^(y{4}|y{2})[\/-](m{1,2})[\/-](d{1,2})$)|(^(m{1,2})[\/-](d{1,2})[\/-]((y{4}|y{2})$))|(^(d{1,2})[\/-](m{1,2})[\/-]((y{4}|y{2})$))/gi
    .test(format);
}

function zip(date: any, format: string) {
  const zippedArr = [],
    len = Math.min(date.length, format.length);

  for (let i = 0; i < len; i++) {
    zippedArr.push([date[i], format[i]]);
  }

  return zippedArr;
}

export default function isDate(input: any, options: any) {
  if (typeof options === "string") { // Allow backward compatbility for old format isDate(input [, format])
    options = merge({ format: options }, default_date_options);
  } else {
    options = merge(options, default_date_options);
  }
  if (typeof input === "string" && isValidFormat(options.format)) {
    const formatDelimiter = options.delimiters
      .find((delimiter: any) => options.format.indexOf(delimiter) !== -1);
    const dateDelimiter = options.strictMode
      ? formatDelimiter
      : options.delimiters.find((delimiter: any) =>
        input.indexOf(delimiter) !== -1
      );
    const dateAndFormat = zip(
      input.split(dateDelimiter),
      options.format.toLowerCase().split(formatDelimiter),
    );
    const dateObj: any = {};

    for (const [dateWord, formatWord] of dateAndFormat) {
      if (dateWord.length !== formatWord.length) {
        return false;
      }

      dateObj[formatWord.charAt(0)] = dateWord;
    }

    return new Date(`${dateObj.m}/${dateObj.d}/${dateObj.y}`).getDate() ===
      +dateObj.d;
  }

  if (!options.strictMode) {
    return Object.prototype.toString.call(input) === "[object Date]" &&
      isFinite(input);
  }

  return false;
}
