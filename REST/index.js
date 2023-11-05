const path = require("path");
const fs = require("fs/promises");
const usersPath = path.join(__dirname, "..", "db", "users.json");

class FileOperations {
  constructor(path) {
    this.path = path;
  }
  read = async () => {
    try {
      const users = await fs.readFile(this.path, "utf-8");
      return JSON.parse(users); //String
    } catch (err) {
      return err.message;
    }
  };

  display = async () => {
    const users = await this.read();
    return users;
  };

  create = async (data) => {
    const result = await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    if (result) {
      return data;
    }
  };

  update = async (user) => {
    const users = await this.read();
    users.push(user);
    return await this.create(users);
  };
  remove = async () => {
    return fs.unlink(this.path);
  };

  fetchOne = async (id) => {
    const users = await this.read();
    const idx = users.findIndex((item) => item.id === id);

    if (idx === -1) {
      console.log("User not found");
      return null;
    }
    const user = users[idx];
    return user;
  };

  updateOne = async (id, newName) => {
    const users = await this.read();
    const idx = users.findIndex((item) => item.id === id);

    if (idx === -1) {
      console.log("User not found");
      return null;
    }
    users[idx].name = newName;
    await this.create(users);
    return users[idx];
  };

  removeOne = async (id) => {
    const users = await this.read();
    const idx = users.findIndex((item) => item.id === id);

    if (idx === -1) {
      console.log("User not found");
      return null;
    }
    const removedUser = users[idx];
    users.splice(idx, 1);
    await this.create(users);
    return removedUser;
  };
}

module.exports = new FileOperations(usersPath);
// file.read();
//CRUD
// file.display(); //Виводить в консоль зміст users.json
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
