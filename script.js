const usersArr = document.querySelector(".users-root");
const updateUsers = document.querySelector(".update");
const search = document.querySelector(".input-search");
const MAIN_URL = "https://jsonplaceholder.typicode.com/users";

let userList = [];

//кидаем запрос на получение пользователей

const getUsers = async () => {
  let response = await fetch(MAIN_URL);
  let data = await response.json();
  userList = data;
  renderUsers(userList);
};

//отображаем пользователей

const renderUsers = (userList) => {
  usersArr.innerHTML = "";
  for (let user of userList) {
    let { id, name, email, phone } = user;
    const users = document.createElement("div");
    users.classList.add("userCard");
    users.innerHTML = `
        <ul class="userlist">
            <li class="user-info name"><p>name:</p> ${name}</li>
            <li class="user-info email"> <p>email:</p> ${email}</li>
            <li class="user-info phone"><p>phone:</p> ${phone}</li>
        </ul>
    `;
    usersArr.append(users);
  }
};

//функция поиска

const filterUsers = (userList, searchTerm) => {
  return userList.filter((user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
};

search.addEventListener("input", () => {
  const searchTerm = search.value.trim();
  const filteredUsers = filterUsers(userList, searchTerm);
  renderUsers(filteredUsers);
});

//обнвление пользователей

updateUsers.onclick = () => {
  location.reload();
};

getUsers();
