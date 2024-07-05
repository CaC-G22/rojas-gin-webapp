const updBtn = document.getElementById("update-user-info-button");
const delBtn = document.getElementById("delete-user-button");

updBtn.addEventListener("mousedown", change);
updBtn.addEventListener("mouseup", change);
delBtn.addEventListener("mousedown", change);
delBtn.addEventListener("mouseup", change);

function change(e) {
  e.target.classList.toggle("pressed");
}



function userLogIn(params) {
  
}

function userRegister(params) {
  
}

function userUpdate(params) {
  
}

function userDelete(params) {
  
}