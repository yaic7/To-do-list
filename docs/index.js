// exemple des tasks

let tasks = [];
tasks = JSON.parse(localStorage.getItem("tasks"));

function readTask() {
  let taskStocker = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskStocker);
}

// fonction qui affiche la liste du task
function addTask() {
  document.getElementById("tasks").innerHTML = "";
  let i = 0;
  for (task of tasks) {
    let color = task.isDone;
    document.getElementById("tasks").innerHTML += ` <div
            class="task ${
              task.isDone ? "taskDone" : ""
            } border-b-2 border-black h-4/6 flex items-center hover:shadow-lg hover:shadow-slate-900 transition"
            >
            <!-- une task -->
            <div class="w-8/12 h-4/6 font-bold m-2">
              <!-- titre du task -->
              <h2>${task.titre}</h2>
              <!-- la date du task -->
              <div>
                <span class="material-symbols-outlined mt-2">
                  calendar_month
                </span>
                <span>${task.date}</span>
                <p>end : ${task.dateEnd}</p>
              </div>
            </div>
            <!-- fin d'une task -->
            <!-- les bouttons de chaque liste -->
            <div
              class="flex items-center justify-around w-3/6 h-4/6 text-white"
            >
            ${
              task.isDone
                ? `<button onclick="not_done(${i})" class="b-radius b-Done">
                <span class="material-symbols-outlined"> cancel </span>
              </button>`
                : `<button onclick="done(${i})" class="b-radius bg-green-700">
              <span class="material-symbols-outlined"> done </span>
            </button>`
            }
              
              <button onclick="updateTask(${i})" class="b-radius bg-yellow-500">
                <span class="material-symbols-outlined"> edit </span>
              </button>
              <button onclick="deletTask(${i})" class="b-radius bg-red-600">
                <span class="material-symbols-outlined"> delete </span>
              </button>
            </div>
            </div>`;
    i++;
  }
}
// supprimer une task
function deletTask(index) {
  let task = tasks[index];
  let confirmer = confirm("supprimer cette task ? \n" + task.titre);
  if (confirmer) {
    tasks.splice(index, 1);
    readTask();
    addTask();
  }
}

// modifier une task
function updateTask(index) {
  let task = tasks[index];
  let modifier = confirm("voulez-vous modifier la tâche ?");
  if (modifier) {
    let newTitre = prompt("entrez le titre :", task.titre);
    task.titre = newTitre;
    let modofierDate = confirm("modifier la date ?");
    if (modofierDate) {
      let time = new Date();
      let timeFormat =
        time.getDate() +
        "/" +
        (time.getMonth() + 1) +
        "/" +
        time.getFullYear() +
        "|" +
        time.getHours() +
        ":" +
        time.getMinutes();
      task.date = timeFormat;
    }
  }
  readTask();
  addTask();
}

// task complete
function done(index) {
  let task = tasks[index];
  task.isDone = true;
  let time = new Date();
  let timeFormat =
    time.getDate() +
    "/" +
    (time.getMonth() + 1) +
    "/" +
    time.getFullYear() +
    "|" +
    time.getHours() +
    ":" +
    time.getMinutes();
  task.dateEnd = timeFormat;
  readTask();
  addTask();
}

// task non complete
function not_done(index) {
  let task = tasks[index];
  task.isDone = false;
  task.dateEnd = "pas encore";
  readTask();
  addTask();
}

// fonction pour la date fin d'une task
function endTask(index) {
  let task = tasks[index];
  if ((task.isDone = true)) {
  }
}

// appel du fonction qui remplir la liste des task
addTask();
// eventement d'ajouter une task
document.getElementById("ajouter").addEventListener("click", function () {
  let taskTitre = prompt("entrer le nom du task");
  if (taskTitre) {
    // recuperer la date
    let time = new Date();
    let timeFormat =
      time.getDate() +
      "/" +
      (time.getMonth() + 1) +
      "/" +
      time.getFullYear() +
      "|" +
      time.getHours() +
      ":" +
      time.getMinutes();

    // la nouvelle task
    let newTask = {
      titre: taskTitre,
      date: timeFormat,
      isDone: false,
      dateEnd: "pas encore",
    };
    // ajouter à l'ensemble d'objet et l'appel du finction afficher
    tasks.push(newTask);
    readTask();
    addTask();
  }
});
