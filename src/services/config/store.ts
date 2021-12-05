import os from 'https://deno.land/x/dos@v0.11.0/mod.ts';
import * as path from 'https://deno.land/std/path/mod.ts';
import {ensureDirSync} from 'https://deno.land/std@0.114.0/fs/ensure_dir.ts';


export class StoredObjectService {


	/**
	 * Get an object from the lethean object store
	 *
	 * @param {{group: string, object: string}} args
	 * @returns {string}
	 */
	public static getObject(args: {group:string, object: string}){
		const home = os.homeDir();
		return Deno.readTextFileSync(path.join(home ? home : './', 'Lethean', 'data', 'objects', args.group, args.object));
	}

	/**
	 * Set a object
	 *
	 * @param {{group: string, object: string, data: string}} args
	 */
	public static setObject(args: {group:string, object: string, data: string}){
		const home = os.homeDir();
		const objPath = path.join(home ? home : './', 'Lethean', 'data', 'objects', args.group, args.object + '.json');
		ensureDirSync(path.join(home ? home : './', 'Lethean', 'data', 'objects', args.group));

		Deno.writeTextFileSync(objPath, args.data);
	}

	/**
	 * Remove objects
	 *
	 * @param {{group: string, object: string}} args
	 */
	public static removeObject(args: {group:string, object: string}){
		const home = os.homeDir();
		const objPath = path.join(home ? home : './', 'Lethean', 'data', 'objects', args.group, args.object + '.json');
		Deno.removeSync(objPath);
	}

	/**
	 * Clear objects
	 *
	 * @param {{group: string}} args
	 */
	public static clearObjects(args: {group:string}){
		const home = os.homeDir();
		const objPath = path.join(home ? home : './', 'Lethean', 'data', 'objects', args.group );
		Deno.removeSync(objPath, { recursive: true });
	}

	/**
	 * count objects
	 *
	 * @param {{group: string}} args
	 * @returns {any[]}
	 */
	public static countObjects(args: {group:string}){
		const home = os.homeDir();
		const objPath = path.join(home ? home : './', 'Lethean', 'data', 'objects', args.group );
		const ret = [];
		for (const dirEntry of Deno.readDirSync(objPath)) {
			if (!dirEntry.name.startsWith(".")) {
				ret.push(dirEntry.name);
			}
		}
		return ret;
	}

}

