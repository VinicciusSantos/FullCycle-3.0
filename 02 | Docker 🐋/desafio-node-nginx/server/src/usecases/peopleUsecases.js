class PeopleUsecases {
  constructor(peopleRepository) {
    this.peopleRepository = peopleRepository;
  }

  async getAllPeoples() {
    await this.peopleRepository.insertRandomUser();
    const peoples = await this.peopleRepository.getAll();
    return `
    <h1>Full Cycle</h1>
    <table>
        <tr>
            <th>Id</th>
            <th>Nome</th>
        </tr>
        ${peoples.map(
          (item) => `
        <tr>
            <td><strong>${item.id}</strong></td>
            <td>${item.nome}</td>
        </tr>
        `
        )}
    </table>
`;
  }
}

module.exports = PeopleUsecases;
