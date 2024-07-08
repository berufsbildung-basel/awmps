const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
require("dotenv").config();

const pool = new Pool({
    user: "sinokholkhojaev",
    host: "localhost",
    database: "first",
    password: process.env.DB_PASSWORD,
    port: 5432,
});

const executeSqlFile = async (filePath) => {
    const client = await pool.connect();
    try {
        const sql = fs.readFileSync(filePath, { encoding: "utf-8" });
        await client.query("BEGIN");
        await client.query(sql);
        await client.query("COMMIT");
    } catch (e) {
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }
};

const setupDatabase = async () => {
    await executeSqlFile(path.join(__dirname, "create_tables.sql"));
    await executeSqlFile(path.join(__dirname, "insert_sample_data.sql"));
};

const cleanupDatabase = async () => {
    await executeSqlFile(path.join(__dirname, "cleanup.sql"));
};

const runScript = async () => {
    try {
        await setupDatabase();
        console.log("Lemon press q to exit");

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on("line", (input) => {
            if (input === "q") {
                console.log("cleaning up the database");
                cleanupDatabase()
                    .then(() => process.exit())
                    .catch(e => console.error("clean up failed:", e.stack));
            }
        });
    } catch (e) {
        console.error("error:", e.stack);
    }
};

runScript();