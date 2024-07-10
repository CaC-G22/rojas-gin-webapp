import { completeForm } from "./general.js";

const form = document.getElementById("contactForm");

form.addEventListener("submit", validateContactForm);

function validateContactForm(event) {
  event.preventDefault();

  const fieldIds = ["firstName", "lastName", "email", "message"];

  const formData = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    message: form.message.value,
  };

  if (completeForm(formData, fieldIds)) {
    alert("Nos pondremos en contacto con usted ¡Gracias por contactarnos!");
  } else {
    alert("Por favor, complete todos los campos.");
  }
}
