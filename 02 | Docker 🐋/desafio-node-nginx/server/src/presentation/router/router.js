const express = require("express");

class RouterManager {
  router = express.Router();

  constructor(peoplesController) {
    this.router.get("/", (req, res) => peoplesController.getAllPeoples(req, res));
  }

  get routes() {
    return this.router;
  }
}

module.exports = RouterManager;
