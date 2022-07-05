import { createConnection, Connection } from 'typeorm';

import * as entities from '../entity';

const createDatabaseConnection = (): Promise<Connection> =>
  createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
      entities: Object.values(entities),
    //   entities: [
    //       Comment,
    //       User,
    //       Issue,
    //       Project,
    //   ],
      // entities: [`${__dirname}/api/src/entities/*{.js,.ts}`],
      synchronize: false,
  });

export default createDatabaseConnection;
