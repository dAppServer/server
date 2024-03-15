import {DB} from "https://deno.land/x/sqlite/mod.ts";
import {Injectable} from "https://deno.land/x/danet/mod.ts";

@Injectable()
export class SqliteService {
    private db: {[key: string]: DB} = {};

    constructor() {

    }


    openDatabase(name: string = "database.db") {
        return this.db[name] = new DB(name);
    }

    closeDatabase(name: string = "database.db") {
        this.db[name].close();
    }
    createTable(dbName: string, tableName: string) {
        this.db[dbName].execute(`CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`)
        return true
    }

    dbQuery(dbName: string, query: string) {
        return this.db[dbName].query(query);
    }

    dbSelect(dbName: string, table: string, keys: string[]){
        return this.db[dbName].query(`SELECT ${keys.join(', ')} FROM ${table}`);
    }

    dbInsert(dbName: string, table: string, keys: string[], values: string[]) {
        return this.db[dbName].query(`INSERT INTO ${table} (${keys.join(', ')}) VALUES (?)`, values);
    }


}