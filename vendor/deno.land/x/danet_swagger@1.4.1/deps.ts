// const danetImport = '../Danet/';
// const danetImport = 'https://deno.land/x/danet@1.3.0';

export {
	Body,
	BODY_TYPE_KEY,
	Controller,
	DanetApplication,
	Get,
	Module,
	type ModuleConstructor,
	moduleMetadataKey,
	Param,
	Patch,
	Post,
	Put,
	Query,
	QUERY_TYPE_KEY,
	trimSlash,
} from 'https://deno.land/x/danet@1.3.3/mod.ts';
export { MetadataHelper } from 'https://deno.land/x/danet@1.3.3/src/metadata/helper.ts';
export * as pathToRegexp from 'https://deno.land/x/path_to_regexp@v6.2.1/index.ts';
export * as path from 'https://deno.land/std@0.167.0/path/mod.ts';
