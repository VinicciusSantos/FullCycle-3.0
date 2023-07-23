const express = require("express");
const setupDatabase = require("./data/data-sources/mysql");
const RouterManager = require("./presentation/router/router");

const PeopleRepository = require("./data/repositories/people");
const PeopleController = require("./presentation/controllers/peopleController");
const PeopleUsecases = require("./usecases/peopleUsecases");

const app = express();
const db = setupDatabase();

const peoplesRepository = new PeopleRepository(db);
const peoplesUsecase = new PeopleUsecases(peoplesRepository);
const peoplesController = new PeopleController(peoplesUsecase);

const router = new RouterManager(peoplesController);
app.use(router.routes);

module.exports = app;
