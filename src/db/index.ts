import { drizzle } from "drizzle-orm/mysql2";
import * as schema from './schema';
import mysql from "mysql2/promise";
import fs from 'fs';

const connection = mysql.createPool({
    host: process.env.HOST,
    port: 54737,
    user: process.env.USERNAME,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
});

export const db = drizzle(connection, { schema, mode: 'default' });
