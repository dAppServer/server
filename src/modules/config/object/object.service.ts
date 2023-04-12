import  * as path from "std/path/mod.ts";
import { Injectable } from "danet/mod.ts";
import { FileSystemService } from "@module/io/filesystem/fileSystemService.ts";

/**
 * Store
 */
@Injectable()
export class ObjectService {

  constructor(private fileSystem: FileSystemService) {}

  /**
   * Get a object from the store
   * @param {string} group
   * @param {string} object
   * @returns {string | boolean}
   */
  public getObject(group: string, object: string ): string|boolean {
    try {
      return this.fileSystem.read(path.join("data", "objects", group, object + ".json"))
    } catch (e) {
      return false;
    }
  }

  /**
   * Create a object in the store
   * @param {string} group
   * @param {string} object
   * @param {string} data
   * @returns {boolean}
   */
  public setObject( group: string, object: string, data: string ): boolean {
    try {
      return this.fileSystem.write(path.join("data", "objects", group, object + ".json"), data);
    } catch (e) {
      return false;
    }
  }

  /**
   * Remove a object from the store
   * @param {string} group
   * @param {string} object
   * @returns {boolean | boolean}
   */
  public removeObject( group: string, object: string ): boolean {
    try {
      return this.fileSystem.delete(path.join("data", "objects", group, object + ".json"));
    } catch (e) {
      return false;
    }
  }

  /**
   * Clear all objects from the store for a group
   * @param {string} group
   * @returns {boolean}
   */
  public clearObjects( group: string ): boolean {
    try {
      return this.fileSystem.delete(path.join("data", "objects", group), true);
    } catch (e) {
      return false;
    }
  }

  /**
   * Get a count of objects in the store for a group
   * @param {string} group
   * @returns {number}
   */
  public countObjects(group: string ): number {
    try {
      const count = this.fileSystem.detailedList(path.join("data", "objects", group));

      return count.length;
    } catch (e) {
      return 0;
    }
  }
}
