const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
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

const createTables = async () => {
    await executeSqlFile(path.join(__dirname, "create_tables.sql"));
};

const insertSampleData = async () => {
    await executeSqlFile(path.join(__dirname, "insert_sample_data.sql"))
};

const cleanup = async () => {
    await executeSqlFile(path.join(__dirname, "cleanup.sql"));
};

const runScript = async () => {
    try {
        await createTables();
        await insertSampleData();
    } catch (e) {
        console.error(e.stack);
    }
};

runScript();
