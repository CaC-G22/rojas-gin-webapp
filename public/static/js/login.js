import { completeForm, generalFetch } from "./general.js";

// Log in action
// Gets button, posts email and password; if ok, stores user info and redirects to profile
const form = document.getElementById("loginForm");

const loginUser = async (evt) => {
  evt.preventDefault();

  const fieldIds = ["email", "password"];

  const formData = {
    email: form.email.value,
    password: form.password.value,
  };

  if (completeForm(formData, fieldIds)) {
    const loginRequest = await generalFetch("POST", "/users/login", formData);

    if (loginRequest.ok) {
      const userInfo = await loginRequest.json();

      window.localStorage.setItem("user", JSON.stringify(userInfo.user));

      alert(userInfo.message);

      window.location.replace("/templates/profile.html");
    } else {
      const failedLogin = await loginRequest.json();

      alert(failedLogin.message);
    }
  } else {
    alert("Complete todos los campos");
  }
};

form.addEventListener("submit", loginUser);
