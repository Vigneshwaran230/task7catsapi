const section = document.createElement("section");
section.setAttribute("class", "user-list");
const div1 = document.createElement("div");
div1.setAttribute("class", "div-list");
var searchBar = document.createElement("INPUT");
searchBar.setAttribute("type", "text");
searchBar.setAttribute("class", "text-list");
searchBar.setAttribute("placeholder", "search for a cats");
div1.append(searchBar);
let users = [];
// console.log(users)
searchBar.addEventListener("keyup", (e) => {
  document.querySelector(".user-list").innerHTML = "";
  const searchString = e.target.value.toLowerCase();
  console.log(searchString);
  const filtered = users.filter((character) => {
    return (
      character.id.toLowerCase().includes(searchString) ||
      character.tags.includes(searchString)
    );
  });
  console.log(filtered);
  filtered.forEach((cats1) => createUser(cats1));
});

const getUsers = async () => {
  try {
    const data = await fetch("https://cataas.com/api/cats", {
      method: "GET"
    });
    users = await data.json();
    document.querySelector(".user-list").innerHTML = "";
    users.forEach((user) => createUser(user));
  } catch (err) {
    console.error(err);
  }
};

function createUser(cats) {
  const info = document.createElement("div");
  info.setAttribute("class", "container");
  info.innerHTML = `
  <div class="main-class">
    <div class="user-container">
          <img class="user-pic" src="https://cataas.com/cat/${
            cats.id
          }" width="250px" height="250px"/>
   </div>
   <div class="inside">
   <h4>CAT_Id:${cats.id}</h4>
    <p class="user-join-date"> ${new Date(cats.created_at).toDateString()}</p>
    <input class="cats-button" type"button" value="View_cats" onclick="window.open('https://cataas.com/cat/${
      cats.id
    }')"/>

    </div>
    </div>
   `;

  document.querySelector(".user-list").append(info);
}


document.body.append(div1, section);
getUsers();
