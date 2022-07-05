import { ini, path, renderFile } from "../../../deps.ts";

// the user facing ini object
interface UserINIObject {
  parse(str: string): object;

  stringify(obj: object): string;
}

// internal ini variable object, its what is used for vars
interface INIVariableObject {
  [name: string]: number | string | boolean | null;
}

// internal INI object, its what parseFunc() parses to.
interface INIObject {
  [section: string]: INIVariableObject;
}

export class IniService {
  convertVariable(str: string): number | string | boolean | null {
    if (str.match(/\'.+\'/gi) || str.match(/\".+\"/gi)) {
      return str.slice(1, str.length - 1);
    } else if (str === "false") {
      return false;
    } else if (str === "true") {
      return true;
    } else if (str === "null") {
      return null;
    } else if (
      Number(str) != NaN || Number(str) != undefined || Number(str) != null
    ) {
      return Number(str);
    } else {
      return null;
    }
  }

  parse(str: string): INIObject {
    let obj: INIObject = {};
    let lines = str.split("\n").filter((i) => i != "" && !(i.startsWith(";")));
    let reachedBlockName = "";
    for (let i of lines) {
      if (i.match(/\[.+\]/gi)) {
        reachedBlockName = i.slice(1, i.length - 1);
        obj[reachedBlockName] = {};
      } else {
        let variable = i.split("=").map((i) => i.trim());
        obj[reachedBlockName][variable[0]] = this.convertVariable(variable[1]);
      }
    }
    return obj;
  }

  stringify(obj: INIObject | any): string {
    let str = "";
    //str += `[${i}]\n`;
    for (let j in obj) {
      let variable = [j, obj[j]];
      //      if (typeof variable[1] === "string") {
      //        str += `${variable[0]}="${variable[1]}"\n`;
      //      } else {
      str += `${variable[0]}=${variable[1]}\n`;
      //}
    }
    return str;
  }
}
