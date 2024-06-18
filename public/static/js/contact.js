const form = document.getElementById("contactForm");

form.addEventListener("submit", validateForm);

// Simple verification if the field exists and is complete
// Originally created as a cluster of validations for ReactJs
function isFieldComplete(formFields, fieldId) {
  return formFields[fieldId] && formFields[fieldId] !== "";
}

// Checks if all information is in a form
function completeForm(formData, fieldIdArray) {
  return fieldIdArray
    .map((field) => isFieldComplete(formData, field))
    .every((value) => value === true);
}

function validateForm(event) {
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
