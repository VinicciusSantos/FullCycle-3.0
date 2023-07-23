class PeopleController {
  constructor(peoplesUsecase) {
    this.peoplesUsecase = peoplesUsecase;
  }

  async getAllPeoples(_req, res) {
    const response = await this.peoplesUsecase.getAllPeoples();
    return res.send(response);
  }
}

module.exports = PeopleController;
