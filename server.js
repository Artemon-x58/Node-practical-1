const file = require("./REST");
const express = require("express");
const app = express();
// {
//   read: [AsyncFunction: read],
//   display: [AsyncFunction: display],
//   create: [AsyncFunction: create],
//   update: [AsyncFunction: update],
//   remove: [AsyncFunction: remove],
//   updateOne: [AsyncFunction: updateOne],
//   removeOne: [AsyncFunction: removeOne],
//   path: 'C:\\Users\\artem\\OneDrive\\Рабочий стол\\Новая папка (2)\\db\\users.json'
// }

// +++ http://localhost:5000/users // Метод get: видає список всіх користувачів
// +++ http://localhost:5000/users // Метод post: Створює з нуля файл users.json
// +++ http://localhost:5000/users // Метод delete: Повністю видаляє файл users.json
// +++ http://localhost:5000/users // Метод patch: Додає в кінець масиву нового користувача
// +++ http://localhost:5000/users/3 // Метод patch: Шукає користуввача по id і оновлює його ім'я, яке треба передати в тілі запиту
// +++ http://localhost:5000/users/3 // Метод delete: Шукає користуввача по id і видаляє його повністю з масиву
// +++ http://localhost:5000/users/3 // Метод get: Шукає користуввача по id

app.get("/users", async (req, res) => {
  const users = await file.display();
  res.status(200).json({ code: 200, data: users });
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await file.fetchOne(id);
  res.status(200).json({ code: 200, user });
});

app.post("/users", async (req, res) => {
  const data = [
    { id: "1", name: "Artem" },
    { id: "2", name: "Oleg" },
    { id: "3", name: "Nelli" },
  ];
  const users = await file.create(data);
  res.status(201).json({ code: 201, data });
});

app.delete("/users", async (req, res) => {
  const users = await file.remove();
  res.status(200).json({ code: 200, message: "File complitly removed" });
});

app.patch("/users", async (req, res) => {
  const data = { id: "4", name: "Andriy" };
  const users = await file.update(data);
  res.status(200).json({ code: 200, data });
});

app.patch("/users/:id", async (req, res) => {
  // console.log(req.params.id);
  const { id } = req.params;
  const name = "Nelli Ogorodnyk";
  const user = await file.updateOne(id, name);
  res.status(200).json({ code: 200, user });
});

app.delete("/users/:id", async (req, res) => {
  // console.log(req.params.id);
  const { id } = req.params;
  const user = await file.removeOne(id);
  res.status(200).json({ code: 200, user });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
