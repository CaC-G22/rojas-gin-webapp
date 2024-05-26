const form = document.getElementById("contactForm");

form.addEventListener("submit", validateForm);

function validateForm(event) {
  event.preventDefault();

  const name = document.getElementById("name");
  const surname = document.getElementById("surname");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  if (
    name.value == "" &&
    surname.value == "" &&
    email.value == "" &&
    message.value == ""
  ) {
    alert("Por favor, complete todos los campos.");
  } else {
    alert("Nos pondremos en contacto con usted ¡Gracias por contactarnos!");
  }
}
