import { Users } from 'src/users/users.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT | 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [Users],
    migrations: ["dist/migrations/*.js"],
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource