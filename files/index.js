const path = require("path");
const fs = require("fs/promises");
const usersPath = path.join(__dirname, "..", "db", "users.json");
// Заклинание path.join(__dirname)
// console.log(__dirname);
// console.log(__filename);
// console.log(path.join());
// console.log(path.resolve());
// console.log(usersPath);

class FileOperations {
  constructor(path) {
    this.path = path;
  }
  read = async () => {
    const users = await fs.readFile(this.path, "utf-8");
    return JSON.parse(users); //String
  };

  display = async () => {
    const users = await this.read();
    console.log(users);
  };

  create = async (data) => {
    const result = await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    return result;
  };

  update = async (user) => {
    const users = await this.read();
    users.push(user);
    return await this.create(users);
  };
  remove = async () => {
    return fs.unlink(this.path);
  };
  updateOne = async (id, newName) => {
    const users = await this.read();
    const idx = users.findIndex((item) => item.id === id);

    if (idx === -1) {
      console.log("User not found");
      return null;
    }
    users[idx].name = newName;
    return await this.create(users);
  };

  removeOne = async (id) => {
    const users = await this.read();
    const idx = users.findIndex((item) => item.id === id);

    if (idx === -1) {
      console.log("User not found");
      return null;
    }
    users.splice(idx, 1);
    return await this.create(users);
  };
}
const file = new FileOperations(usersPath);
// file.read();
//CRUD
file.display(); //Виводить в консоль зміст users.json
// const data = [
//   { id: "1", name: "Artem" },
//   { id: "2", name: "Oleg" },
//   { id: "3", name: "Nelli" },
// ];
// file.create(data); //Створює з нуля файл users.json
// file.update({ id: "4", name: "Andriy" }); //Додає в кінець масиву нового користувача
// file.remove(); //Повністю видаляє файл users.json
// file.updateOne("3", "Nelli Ogorodnyk"); //Шукає користуввача по id і оновлює його ім'я
// file.removeOne("3"); //Шукає користуввача по id і видаляє його повністю з масиву
