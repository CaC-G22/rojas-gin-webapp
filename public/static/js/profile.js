import { completeForm, generalFetch } from "./general.js";
// Add user info to profile page if it exists
// If not, send to index
const replaceUserInfo = () => {
  const userFirstName = document.getElementById("user-first-name");
  const userLastName = document.getElementById("user-last-name");
  const userEmail = document.getElementById("user-email");
  const userInfo = JSON.parse(window.localStorage.getItem("user"));

  if (userInfo) {
    userFirstName.innerText = userInfo.first_name;
    userLastName.innerText = userInfo.last_name;
    userEmail.innerText = userInfo.email;
  } else {
    alert("You should not be here, begone!");

    window.location.replace("/index.html");
  }
};

document.addEventListener("DOMContentLoaded", replaceUserInfo);

// Masterful and mindblowing button animations
const showUserUpdatebutton = document.getElementById("show-user-update");
const deleteUserButton = document.getElementById("delete-user-button");
const userUpdateButton = document.getElementById("update-user-info-button");

function change(e) {
  e.target.classList.toggle("pressed");
}

showUserUpdatebutton.addEventListener("mousedown", change);
showUserUpdatebutton.addEventListener("mouseup", change);
deleteUserButton.addEventListener("mousedown", change);
deleteUserButton.addEventListener("mouseup", change);
userUpdateButton.addEventListener("mousedown", change);
userUpdateButton.addEventListener("mouseup", change);

// Delete user action
// Gets Id From storage and deletes user WITHOUT any message or confirmation prompt :D
// and redirects to index
const deleteUser = async () => {
  const userId = JSON.parse(window.localStorage.getItem("user")).user_id;

  const deleteRequest = await generalFetch("DELETE", `/users/${userId}`);

  if (deleteRequest.ok) {
    const userInfo = await deleteRequest.json();

    window.localStorage.clear();

    alert(userInfo.message);

    window.location.replace("/index.html");
  } else {
    const failedDeletion = await deleteRequest.json();

    alert(failedDeletion.message);
  }
};

deleteUserButton.addEventListener("click", deleteUser);

// Update user info / 2 steps: show form and update request

// Toggle form visibility, resets form when hiding
const toggleUpdateFormVisibility = () => {
  const userUpdateFormSection = document.getElementsByClassName(
    "update-form-container"
  )[0];

  if (userUpdateFormSection.checkVisibility()) {
    const userUpdateForm = document.getElementById("updateForm");
    userUpdateForm.reset();
  }

  userUpdateFormSection.classList.toggle("hide-element");
};

showUserUpdatebutton.addEventListener("click", toggleUpdateFormVisibility);

// Update user action
// Collects data from form and user_id from storage, performs the request
const updateUserInfo = async (evt) => {
  evt.preventDefault();

  const form = evt.target.form;

  const fieldIds = ["first_name", "last_name", "email", "password"];

  const formData = {
    first_name: form.first_name.value,
    last_name: form.last_name.value,
    email: form.email.value,
    password: form.password.value,
  };

  const userId = JSON.parse(window.localStorage.getItem("user")).user_id;

  if (completeForm(formData, fieldIds, false)) {
    const updateRequest = await generalFetch(
      "PUT",
      `/users/${userId}`,
      formData
    );

    if (updateRequest.ok) {
      const updateResponse = await updateRequest.json();

      window.localStorage.setItem("user", JSON.stringify(updateResponse.user));

      form.reset();

      replaceUserInfo();

      alert(updateResponse.message);

      toggleUpdateFormVisibility();
    } else {
      const failedUpdate = await updateRequest.json();

      alert(failedUpdate.message);
    }
  } else {
    alert("Complete el dato que desee cambiar");
  }
};

userUpdateButton.addEventListener("click", updateUserInfo);
