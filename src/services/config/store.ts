import { ensureDirSync, os, path } from "../../../deps.ts";

/**
 * Store
 */
export class StoredObjectService {
  /**
   * Get an object from the lethean object store
   *
   * @param {{group: string, object: string}} args
   * @returns {string}
   */
  public static getObject(args: { group: string; object: string }) {
    try {
      return Deno.readTextFileSync(
        path.join(
          Deno.cwd(),
          "data",
          "objects",
          args.group,
          args.object + ".json"
        )
      );
    } catch (e) {
      return {  };
    }

  }

  /**
   * Set a object
   *
   * @param {{group: string, object: string, data: string}} args
   */
  public static setObject(
    args: { group: string; object: string; data: string }
  ) {
    try {
      const objPath = path.join(
        Deno.cwd(),
        "data",
        "objects",
        args.group,
        args.object + ".json"
      );
      ensureDirSync(
        path.join(
          Deno.cwd(),
          "data",
          "objects",
          args.group
        )
      );

      Deno.writeTextFileSync(objPath, args.data);
    } catch (e) {
      return false;
    }
  }

  /**
   * Remove objects
   *
   * @param {{group: string, object: string}} args
   */
  public static removeObject(args: { group: string; object: string }) {
    try {
      const objPath = path.join(
        Deno.cwd(),
        "data",
        "objects",
        args.group,
        args.object + ".json"
      );
      Deno.removeSync(objPath);
    } catch (e) {
      return false;
    }
  }

  /**
   * Clear objects
   *
   * @param {{group: string}} args
   */
  public static clearObjects(args: { group: string }) {
    try {
      const objPath = path.join(
        Deno.cwd(),
        "data",
        "objects",
        args.group
      );
      Deno.removeSync(objPath, { recursive: true });
    } catch (e) {
      return false;
    }
  }

  /**
   * count objects
   *
   * @param {{group: string}} args
   * @returns {any[]}
   */
  public static countObjects(args: { group: string }) {
    try {
      const objPath = path.join(
        Deno.cwd(),
        "data",
        "objects",
        args.group
      );
      const ret = [];
      for (const dirEntry of Deno.readDirSync(objPath)) {
        if (!dirEntry.name.startsWith(".")) {
          ret.push(dirEntry.name);
        }
      }
      return ret;
    } catch (e) {
      return false;
    }
  }
}
