document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
});
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    
    const formData = {
      name: document.getElementById("name").value,
      mobile: document.getElementById("mobile").value,
      dob: document.getElementById("dob").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    // using the Fetch API to send the data to the server
    fetch("http://127.0.0.1:5800/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("User registered successfully");
        } else {
          alert("Failed to register user: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to register user");
      });
    fetchUsers();
  });

//script to fetch & display data on profile page
async function fetchUsers() {
  try {
    const response = await fetch("http://127.0.0.1:5800/users");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      const userCards = document.querySelector(".userCards");
      userCards.innerHTML = "";

      data.forEach((user) => {
        let card = `
      <div id="card">
        <i class="fa-solid fa-user card-profile-icon"></i>
        <div id="card_name"><b>Name:</b> ${user.name}</div>
        <div id="card_mobile"><b>Contact:</b> ${user.mobile}</div>
        <div id="card_dob"><b>D.O.B.:</b> ${user.dob}</div>
        <div id="card_email"><b>Email:</b> ${user.email}</div>
      </div>
    `;
        userCards.innerHTML += card;
      });
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to fetch users");
  }
}
let registerPage = document.querySelector(".register-page-container");
let profilePage = document.querySelector(".profiles-page-container");

function showRegisterPage() {
  registerPage.style.display = "block";
  profilePage.style.display = "none";
}
function showProfilesPage() {
  fetchUsers();
  registerPage.style.display = "none";
  profilePage.style.display = "block";
}
