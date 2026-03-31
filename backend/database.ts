import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  port: 3001,
  user: "root",
  password: "",
  database: "bloom_garden",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log("Connected to MySQL successfully");