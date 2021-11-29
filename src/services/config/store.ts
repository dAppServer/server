import os from 'https://deno.land/x/dos@v0.11.0/mod.ts';
import * as path from 'https://deno.land/std/path/mod.ts';
import {Command} from 'https://deno.land/x/cliffy/command/mod.ts';
import {StringResponse} from '../../interfaces/string-response.ts';
import {ensureDirSync} from 'https://deno.land/std@0.114.0/fs/ensure_dir.ts';


export class StoredObjectService {

	public static config() {
		const home = os.homeDir();

		return new Command()
			.description('Configured File Service')
			.command('get', 'Returns a store json data object')
			.option('-g,--group <string>', 'Object Group', {default:'lthn'})
			.option('-o,--object <string>', 'Object key to fetch')
			.action((args) => {
				throw new StringResponse(Deno.readTextFileSync(path.join(home ? home : './', 'Lethean', 'data', 'objects', args.group, args.object)));
			})
			.command('set', 'Returns a store json data object')
			.option('-o,--object <string>', 'Object key to set')
			.option('-g,--group <string>', 'Object Group', {default:'lthn'})
			.option('-d,--data <string>', 'Data object to save')
			.action((args) => {
				const objPath = path.join(home ? home : './', 'Lethean', 'data', 'objects', args.group, args.object + '.json');
				ensureDirSync(path.join(home ? home : './', 'Lethean', 'data', 'objects', args.group));
				Deno.writeTextFileSync(objPath, args.data);
				throw new StringResponse("saved");
			})
			.command('remove', 'Remove an object from storage')
			.option('-g,--group <string>', 'Object Group', {default:'lthn'})
			.option('-o,--object <string>', 'Object key to remove')
			.action((args) => {
				const objPath = path.join(home ? home : './', 'Lethean', 'data', 'objects', args.group, args.object + '.json');
				ensureDirSync(path.join(home ? home : './', 'Lethean', 'data', 'objects', args.group));
				Deno.readTextFileSync(objPath);
				throw new StringResponse("removed");
			})
			.command('clear', 'clears object storage')
			.option('-g,--group <string>', 'Object Group', {default:'lthn'})
			.action((args) => {
				const objPath = path.join(home ? home : './', 'Lethean', 'data', 'objects', args.group );
				Deno.removeSync(objPath, { recursive: true });
				throw new StringResponse("removed");
			})
			.command('count', 'returns object count for group')
			.option('-g,--group <string>', 'Object Group', {default:'lthn'})
			.action((args) => {
				const objPath = path.join(home ? home : './', 'Lethean', 'data', 'objects', args.group );
				const ret = [];
				for (const dirEntry of Deno.readDirSync(objPath)) {
					if (!dirEntry.name.startsWith(".")) {
						ret.push(dirEntry.name);
					}
				}
				throw new StringResponse(ret.length.toString());
			})
	}
}

