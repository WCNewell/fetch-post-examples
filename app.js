// fetch example 1

const ul = document.querySelector("#characters");
const url = "https://quiet-bayou-99554.herokuapp.com/api/v1/contacts";

fetch(url)
  .then(response => {
    return response.json();
  })
  .then(response => {
    let characters = response.data;
    characters.forEach(character => {
      let li = document.createElement("li"),
        img = document.createElement("img"),
        characterName = document.createElement("span"),
        characterMessage = document.createElement("p"),
        anchor = document.createElement("a");
      ul.appendChild(li);
      li.appendChild(img);
      li.appendChild(characterName);
      li.appendChild(characterMessage);
      li.appendChild(anchor);
      img.src = character.imageURL;
      characterName.textContent = character.name + " - " + character.phone;
      characterMessage.textContent = character.message;
      anchor.textContent = "Leave " + character.name + " a message:";
      anchor.href = "contact.html?character = " + character.name;
    });
  });

  // post example 1

  function sendMessage(data) {
    event.preventDefault();
    const url = "https://quiet-bayou-99554.herokuapp.com/api/v1/contacts";
    const body = JSON.stringify({ data });
    fetch(url, {
      method: "POST",
      body,
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        let message = document.querySelector("#response-message");
        if (response.error) {
          message.textContent = response.error.message;
        } else {
          message.textContent = response.data.message;
        }
      });
  }

  // fetch example 2 

  function getScores() {
    fetch(url)
      .then(response => response.json())
      .then(sortScores)
      .then(appendScores);
  }

  // post example 2

  function postScore(data) {
    return fetch(scoreUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then(error => {
          console.error;
        });
      }
    });
  }

  // fetch example 3

  (function getData() {
    fetch("https://secure-eyrie-78012.herokuapp.com/roles")
      .then(response => response.json())
      .then(results => {
        const roles = results;

        roles.forEach(role => {
          const roleOption = document.createElement("option");
          rolesList.appendChild(roleOption);
          roleOption.value = role.id;
          roleOption.textContent = role.label;

          document
            .querySelector("#roles")
            .addEventListener("change", updateImage);

          function updateImage() {
            if (rolesList.value == role.id) {
              roleImage.src = `${role.imageURL}`;
            } else if (rolesList.value == "Select an option here") {
              roleImage.src = "assets/placeholder.jpg";
            }
          }
        });
      });
  })();

// post example 3

function submitForm(event) {
  event.preventDefault();

  fetch("https://secure-eyrie-78012.herokuapp.com/users", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      role: rolesList.value
    })
  })
    .then(response => response.json())
    .then(updateStatus);
}