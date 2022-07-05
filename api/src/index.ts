import express from 'express';
import cors from 'cors';
import {createConnection} from "typeorm";
import {addRespondToResponse} from "./middleware/response";
import {authenticateUser} from "./middleware/authentication";
import {attachPrivateRoutes, attachPublicRoutes} from "./routes";
import {handleError} from "./middleware/errors";
import {RouteNotFoundError} from "./errors";

const port = 9988

createConnection({
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "piggyleeyw900129",
  "database": "jira_development",
  "entities": [__dirname + "/entity/*.ts"],
  "synchronize": true
}).then(_=>{
  const app = express()

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(addRespondToResponse);

  attachPublicRoutes(app);

  app.use('/', authenticateUser);

  attachPrivateRoutes(app);

  app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
  app.use(handleError);

  app.listen(process.env.PORT || port, ()=>{
    console.log(`express app run on port: ${port}`)
  });
}).catch(error=>{
  console.error('TypeORM connection error: ', error)
})