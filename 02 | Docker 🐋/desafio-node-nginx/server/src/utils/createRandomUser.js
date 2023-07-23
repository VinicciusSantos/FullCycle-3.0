async function createRandomUser() {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  const randomName = Object.values(data.results[0].name).join(" ");
  return randomName;
}

module.exports = createRandomUser;
