// Wait for DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
  // Switch between pages
  function switchPage(pageId) {
    var pages = document.getElementsByClassName("page");
    var navItems = document.getElementsByClassName("nav-item");

    for (var i = 0; i < pages.length; i++) {
      if (pages[i].id === "page-" + pageId) {
        pages[i].classList.add("active");
        navItems[i].classList.add("active");
      } else {
        pages[i].classList.remove("active");
        navItems[i].classList.remove("active");
      }
    }
  }

  const todoList = document.getElementById("todo-list");
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const taskCount = document.getElementById("task-count");
  const filterButtons = document.querySelectorAll(".filter-button");
  const notesTextarea = document.getElementById("note-textarea");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let notes = localStorage.getItem("notes") || "";

  // Render tasks
  function renderTasks() {
    todoList.innerHTML = "";

    tasks.forEach(function (task, index) {
      const todoItem = createTodoItem(task, index);
      todoList.appendChild(todoItem);
    });

    updateTaskCount();
  }

  // Create a new todo item element
  function createTodoItem(task, index) {
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      saveTasks();
      updateTaskCount();
      updateFilters();
    });

    const input = document.createElement("input");
    input.type = "text";
    input.value = task.text;
    input.classList.add("editable");
    input.addEventListener("input", function () {
      task.text = input.value;
      saveTasks();
    });

    const image = document.createElement("img");
    image.classList.add("task-image");

    if (task.image) {
      image.src = task.image;
      image.alt = "Task Image";
    } else {
      image.style.display = "none"; // Hide the image element
    }

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = "&times;";
    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
      updateFilters();
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(input);
    todoItem.appendChild(image);
    todoItem.appendChild(deleteButton);

    return todoItem;
  }

  // Add a new task
  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = todoInput.value.trim();
    const imageFile = document.getElementById("image-input").files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const image = event.target.result;

      if (text !== "") {
        const inputTasks = text.split("\n");

        inputTasks.forEach(function (taskText) {
          tasks.push({
            text: taskText,
            completed: false,
            image: image,
          });
        });

        saveTasks();
        todoInput.value = "";
        renderTasks();
        updateFilters();
      }
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      // If no image is selected, add the task without an image
      if (text !== "") {
        const inputTasks = text.split("\n");

        inputTasks.forEach(function (taskText) {
          tasks.push({
            text: taskText,
            completed: false,
            image: "", // Empty image source
          });
        });

        saveTasks();
        todoInput.value = "";
        renderTasks();
        updateFilters();
      }
    }
  });

  // Save tasks to local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Update the task count
  function updateTaskCount() {
    const remainingTasks = tasks.filter((task) => !task.completed).length;
    taskCount.textContent = `${remainingTasks} List${
      remainingTasks !== 1 ? "s" : ""
    } remaining`;
  }

  // Update the task list based on the active filter
  function updateFilters() {
    const activeFilter = document.querySelector(".filter-button.active");
    if (activeFilter) {
      const filter = activeFilter.dataset.filter;
      filterTasks(filter);
    }
  }

  // Filter tasks based on the given filter
  function filterTasks(filter) {
    const filteredTasks = tasks.filter((task) => {
      if (filter === "active") {
        return !task.completed;
      } else if (filter === "completed") {
        return task.completed;
      }
      return true;
    });

    todoList.innerHTML = "";
    filteredTasks.forEach(function (task, index) {
      const todoItem = createTodoItem(task, index);
      todoList.appendChild(todoItem);
    });
  }

  // Toggle filter button states
  function toggleFilterButtons(button) {
    filterButtons.forEach(function (btn) {
      if (btn === button) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // Handle filter button click events
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;
      const action = button.dataset.action;

      if (action === "filter") {
        filterTasks(filter);
        toggleFilterButtons(button);
      }
    });
  });

  // Save notes to local storage
  function saveNotes() {
    localStorage.setItem("notes", notesTextarea.value);
  }

  // Load notes from local storage
  function loadNotes() {
    notesTextarea.value = notes;
  }

  // Update notes when input changes
  notesTextarea.addEventListener("input", function () {
    notes = notesTextarea.value;
    saveNotes();
  });

  // Initial render
  renderTasks();
  loadNotes();

  // Toggle filter dropdown
  function toggleFilterDropdown() {
    const filterOptions = document.getElementById("filter-options");
    const filterIcon = document.querySelector(".filter-icon");
    filterOptions.style.maxHeight = filterOptions.style.maxHeight
      ? null
      : filterOptions.scrollHeight + "px";
    filterIcon.style.transform = filterOptions.style.maxHeight
      ? "rotate(180deg)"
      : "rotate(0)";
  }

  // Apply filter logic
  function applyFilter(filter) {
    // Add your filtering logic here
    console.log("Filter:", filter);
    toggleFilterDropdown();
    filterTasks(filter);
    updateFilters();
    toggleFilterButtons(document.querySelector(`[data-filter="${filter}"]`));
  }

  // Assign functions to the global scope
  window.switchPage = switchPage;
  window.toggleFilterDropdown = toggleFilterDropdown;
  window.applyFilter = applyFilter;
});

// Wait for DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
  // Rest of your code...

  // Create a new todo item element
  function createTodoItem(task, index) {
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";

    // Rest of your code...

    const image = document.createElement("img");
    image.classList.add("task-image");

    if (task.image) {
      image.src = task.image;
      image.alt = "Task Image";
    } else {
      image.style.display = "none"; // Hide the image element
    }

    // Rest of your code...

    return todoItem;
  }

  // Rest of your code...

  // JavaScript code for the update list
  const updateList = document.getElementById("update-list");
  const updateListHeading = document.querySelector(".update-list-heading");
  const updateItems = document.querySelectorAll(".update-item");

  function showUpdateList() {
    updateList.classList.add("active");
  }

  function hideUpdateList() {
    updateList.classList.remove("active");
  }

  function showUpdateItems() {
    updateItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = 1;
        item.style.transform = "translateY(0)";
      }, index * 100);
    });
  }

  function hideUpdateItems() {
    updateItems.forEach((item, index) => {
      item.style.opacity = 0;
      item.style.transform = "translateY(-20px)";
    });
  }

  function showUpdateListHeading() {
    setTimeout(() => {
      updateListHeading.style.opacity = 1;
      updateListHeading.style.transform = "translateY(0)";
    }, 300);
  }

  function hideUpdateListHeading() {
    updateListHeading.style.opacity = 0;
    updateListHeading.style.transform = "translateY(-20px)";
  }

  // Example usage:
  showUpdateList();
  showUpdateListHeading();
  showUpdateItems();
});


