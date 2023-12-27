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
        deleteRow(e, false); 
      });   
    });
    edit.forEach(item => {
      item.addEventListener('click', (e) => {
        editTask(e, false); //llamo funcion EDITAR TAREAS
      });  
    });
    task.forEach(item => {
      item.addEventListener('focus', (e) => {
       editTask(e, true); //llamo funcion EDITAR TAREAS
      });  
    }); 
  });

  const editTask = (e, onfocus) => {
    let editable=  e;
    if(onfocus) {
      
      editable.target.classList.add('editable');
      document.addEventListener('keydown', (e)=> {
        console.log(e.code);
        if(e.code == "Escape") {
          editable.target.classList.remove('editable');
          editable.target.blur();
          if(editable.target.innerHTML == ""){ 
            deleteRow(editable, true);
          }
        }
      });
      editable.target.addEventListener('blur', ()=> {
        
        if(editable.target.innerHTML == ""){ 
          deleteRow(editable, true);
        }
        editable.target.classList.remove('editable');
      });
    } else {
      let editable= e.target.parentNode.parentNode.previousElementSibling.lastElementChild;
      editable.classList.add('editable');
      editable.focus();
    }
   };
   const deleteTask = (e) => {
    let task = e.target.nextElementSibling; 
    text = task.innerHTML;
    if(text.includes("<del>")) { 
      task.innerHTML = task.firstElementChild.textContent;
      task.setAttribute("data-completed","false");
  
    } else {
      task.innerHTML = `<del>${text}</del>`;
      task.setAttribute("data-completed","true"); 
    }
  };




















































































});