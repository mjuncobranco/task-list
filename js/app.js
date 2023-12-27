window.addEventListener('load',() => {
  let id = 0;
  let text = "";
  let alert = document.querySelector(".alert");
  let input = document.querySelector("#task");
  let close = alert.firstElementChild;
  let arrow = document.querySelector(".arrow");
  let done = document.querySelectorAll(".fa-circle-check");
  let trash = document.querySelectorAll(".fa-trash");
  let edit =document.querySelectorAll(".fa-pencil");
  let task = document.querySelectorAll(".task");

  close.addEventListener("click", () => {
    alert.classList.add("dismissible"); //ponerle la clase dismissible para probar
  });






















































































});