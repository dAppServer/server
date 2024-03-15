import {assertEquals} from "https://deno.land/x/std/testing/asserts.ts";
import {ModIoStorageDatabaseSqliteService} from "@mod/io/storage/database/sqlite.service.ts";
const sql = new ModIoStorageDatabaseSqliteService();

Deno.test("Sqlite - Open Database File", async () => {

    sql.openDatabase("database.db")
    assertEquals(
        sql.createTable("database.db", "test"),
        true,
        "Database was not created",
    );
    sql.closeDatabase("database.db");
});

Deno.test("Sqlite - Insert Data", async () => {
    sql.openDatabase("database.db")
    sql.dbInsert("database.db", 'test', ["name"], ["test"])

    sql.closeDatabase("database.db");
});
Deno.test("Sqlite - Fetch Data", async () => {
    sql.openDatabase("database.db")
    const result = sql.dbSelect("database.db", 'test', ["name"])
    assertEquals(
        result.length > 0,
        true,
        "Roes not exist",
    );
    sql.closeDatabase("database.db");
});