import { completeForm, generalFetch } from "./general.js";

// Register new user action
// Gets button, posts form, stores response info in local storage, redirects to profile
const form = document.getElementById("registerForm");

const registerUser = async (evt) => {
  evt.preventDefault();

  const fieldIds = ["first_name", "last_name", "email", "password"];

  const formData = {
    first_name: form.first_name.value,
    last_name: form.last_name.value,
    email: form.email.value,
    password: form.password.value,
  };

  if (completeForm(formData, fieldIds)) {
    const registerRequest = await generalFetch(
      "POST",
      "/users/register",
      formData
    );

    if (registerRequest.ok) {
      const userInfo = await registerRequest.json();

      window.localStorage.setItem("user", JSON.stringify(userInfo.user));

      alert(userInfo.message);

      window.location.replace("/templates/profile.html");
    } else {
      const failedregister = await registerRequest.json();

      alert(failedregister.message);
    }
  } else {
    alert("Complete todos los campos");
  }
};

form.addEventListener("submit", registerUser);
