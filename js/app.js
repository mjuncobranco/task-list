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
    alert.classList.add("dismissible"); 
  });
  input.addEventListener("focus", () => {
    document.addEventListener("keydown", (e) => {
      
      if (e.code == "Enter" || e.code == "NumpadEnter") {
        e.preventDefault();
        
      }
    });
  });
  arrow.addEventListener("click", (e) => {
    if (input.value.trim() == "") { 
      e.preventDefault();
      input.value = ""; 
      alert.classList.remove("dismissible");
    } else {
      text = input.value; 
      input.value = ""; 
      id = Number(
        document.querySelector("tbody")?.lastElementChild?.id + 1 || 0
      ); 
      document.querySelector("tbody").appendChild(generateRow(id, text));
      if (!alert.classList.contains("dismissible")) {
        alert.classList.add("dismissible"); 
      }      
    }
    done.forEach(item => {
      item.addEventListener('click', (e) => {
         deleteTask(e); 
      }); 
     });
     trash.forEach(item => {
      item.addEventListener('click', (e) => {
        deleteRow(e, false); //llamo funcion para tachar y destachar tareas, que fue creada debajo de este evento
      });   
    });
  });






















































































});