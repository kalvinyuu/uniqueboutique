import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
 
const poolConnection = mysql.createPool({
  host: "host",
  user: "username",
  database: "database",
});
 
const db = drizzle(poolConnection);
