// import { Client } from "mysql";
import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";
import { Injectable } from "https://deno.land/x/danet/mod.ts";

@Injectable()
export class MysqlService {
    db: Client;

    options: {
        database: string,
        host: string,
        username: string,
        password: string,
        port: number
    } = {
        database: 'dappserver',
        host: 'localhost',
        username: 'username',
        password: 'password',
        port: 3306, // optional
    }
    async connect(){
        this.db = await new Client().connect(this.options)
    }

    async createDatabase(dbName: string) {
        return await this.db.execute(`CREATE TABLE IF NOT EXISTS ${dbName}`)
    }

    /**
     * Execute a query
     * @param query
     * @param values
     * @param iterator
     * .execute(`INSERT INTO users(name) values(?)`, [
     *   "manyuanrong",
     * ])
     *
     * .execute(`update users set ?? = ?`, ["name", "MYR"])
     *
     * .execute(`delete from users where ?? = ?`, ["id", 1])
     *
     * const users = .execute(`select * from users where ?? = ?`, ["id", 1], true)
     * for await (const user of users) {
     *     console.log(user);
     *   }
     */
    async execute(query: string, values?: any[], iterator = false) {
        if(!iterator) {
            const { rows: rows } = await this.db.execute(query, values)
            return rows
        }else {
            return this.db.useConnection(async conn => {
                const { iterator: rows } = await conn.execute(query, values, iterator)
                return rows
            })
        }
    }
}

