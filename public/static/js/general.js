// JS used in all site and some shared functions

// Simple verification if the field exists and is complete
// Originally created as a cluster of validations for ReactJs
function isFieldComplete(formFields, fieldId) {
  return formFields[fieldId] && formFields[fieldId] !== "";
}

// Checks if all information is in a form
export function completeForm(formData, fieldIdArray, allRequired = true) {
  return allRequired
    ? fieldIdArray
        .map((field) => isFieldComplete(formData, field))
        .every((value) => value === true)
    : fieldIdArray
        .map((field) => isFieldComplete(formData, field))
        .some((value) => value === true);
}

const apiURL = "http://127.0.0.1:5000";
const baseEP = "/api";

// General Fetch
// api/route
// METHOD
export const generalFetch = async (method, url, formData = null) => {
  try {
    const init = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: formData ? JSON.stringify(formData) : null,
      redirect: "follow",
    };

    let request = await fetch(apiURL + baseEP + url, init);

    return request;
  } catch (error) {
    console.log("Failed at base fetch", error);

    return error;
  }
};

// Log In/Profile buttons visibility
document.addEventListener("DOMContentLoaded", () => {
  const userInfo = window.localStorage.getItem("user");

  if (userInfo) {
    document.getElementsByClassName("profile-btn")[0].classList.add("logged");
    document
      .getElementsByClassName("login-btn")[0]
      .classList.add("hide-element");
  } else {
    document
      .getElementsByClassName("profile-btn")[0]
      .classList.add("hide-element");
    document
      .getElementsByClassName("login-btn")[0]
      .classList.remove("hide-element");
  }
});
