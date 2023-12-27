window.addEventListener("load", () => {
  let id = 0;
  let text = "";
  let alert = document.querySelector(".alert");
  let input = document.querySelector("#task");
  let close = alert.firstElementChild;
  let arrow = document.querySelector(".arrow");
  let done = document.querySelectorAll(".fa-circle-check");
  let trash = document.querySelectorAll(".fa-trash");
  let edit = document.querySelectorAll(".fa-pencil");
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
  });

  done.forEach((item) => {
    item.addEventListener("click", (e) => {
      deleteTask(e);
    });
  });

  trash.forEach((item) => {
    item.addEventListener("click", (e) => {
      deleteRow(e, false);
    });
  });

  edit.forEach((item) => {
    item.addEventListener("click", (e) => {
      editTask(e, false); //llamo funcion EDITAR TAREAS
    });
  });

  task.forEach((item) => {
    item.addEventListener("focus", (e) => {
      editTask(e, true); //llamo funcion EDITAR TAREAS
    });
  });
});

const editTask = (e, onfocus) => {
  let editable = e;
  if (onfocus) {
    editable.target.classList.add("editable");
    document.addEventListener("keydown", (e) => {
      console.log(e.code);
      if (e.code == "Escape") {
        editable.target.classList.remove("editable");
        editable.target.blur();
        if (editable.target.innerHTML == "") {
          deleteRow(editable, true);
        }
      }
    });
    editable.target.addEventListener("blur", () => {
        if (editable.target.innerHTML == "") {
          deleteRow(editable, true);
        }
        editable.target.classList.remove("editable");
    });
  } else {
    let editable =
    e.target.parentNode.parentNode.previousElementSibling.lastElementChild;
    editable.classList.add("editable");
    editable.focus();
  }
};

  const deleteTask = (e) => {
    let task = e.target.nextElementSibling;
    text = task.innerHTML;
    if (text.includes("<del>")) {
      task.innerHTML = task.firstElementChild.textContent;
      task.setAttribute("data-completed", "false");
    } else {
      task.innerHTML = `<del>${text}</del>`;
      task.setAttribute("data-completed", "true");
    }
  };

  const deleteRow = (e, editing) => {
    if (editing) {
      e.target.parentNode.parentNode.remove();
    } else {
      e.target.parentNode.parentNode.parentNode.remove();
    }
  };

  const generateRow = (id, text) => {
    let newRow = document.createElement("tr");
    newRow.setAttribute("id", id);
    newRow.innerHTML = ` 
    <td>
      <i class="fa-solid fa-circle-check fa-2x"></i
      >
      <span class="task" contenteditable="true"> ${text} </span>
      </td>
      <td>
      <span class="fa-stack fa-2x">
      <i class="fa-solid fa-square fa-stack-2x"></i>
      <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
      </span>
      </td>
      <td>
      <span class="fa-stack fa-2x">
      <i class="fa-solid fa-square fa-stack-2x"></i>
      <i class="fa fa-trash fa-stack-1x fa-inverse"></i>
      </span>
      </td>
         `;  
      newRow.firstElementChild.firstElementChild.addEventListener(
      "click",
      (e) => {
        //agrego evento click al icono verde
        deleteTask(e); // llamo funcion borrar para tachar tarea
      }
    );
      newRow.firstElementChild.lastElementChild.addEventListener("click", (e) => {
      editTask(e, true); //agrego evento de edit task al contenido del span para editar tarea
    }); //el booleano true es para saber si es modo editable
      newRow.firstElementChild.nextElementSibling.lastElementChild.addEventListener(
      "click",
      (e) => {
        editTask(e, false); //agrego evento de edit task icono lapiz para editar tarea, booleano false porque no esta en modo editable, sino evento click en icono
      }
    );
      newRow.lastElementChild.lastElementChild.addEventListener("click", (e) => {
        deleteRow(e, false); //el booleano true es para saber si es modo editable
      });
    return newRow;
  };
 
