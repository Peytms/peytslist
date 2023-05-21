// script.js
function switchPage(pageId) {
    // Get all page elements
    var pages = document.getElementsByClassName("page");
  
    // Get all nav-item elements
    var navItems = document.getElementsByClassName("nav-item");
  
    // Iterate over each page element and hide them
    for (var i = 0; i < pages.length; i++) {
      pages[i].classList.remove("active");
    }
  
    // Iterate over each nav-item element and remove active class
    for (var i = 0; i < navItems.length; i++) {
      navItems[i].classList.remove("active");
    }
  
    // Show the selected page
    document.getElementById("page-" + pageId).classList.add("active");
  
    // Add active class to the clicked nav-item
    event.currentTarget.classList.add("active");
  }
  

  document.addEventListener("DOMContentLoaded", function() {
    const todoList = document.getElementById("todo-list");
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const taskCount = document.getElementById("task-count");
    const filterButtons = document.querySelectorAll(".filter-button");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks
    function renderTasks() {
      todoList.innerHTML = "";

      tasks.forEach(function(task, index) {
        const todoItem = createTodoItem(task, index);
        todoList.appendChild(todoItem);
      });

      updateTaskCount();
    }

    // Create a new todo item element
    function createTodoItem(task, index) {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", function() {
        task.completed = checkbox.checked;
        saveTasks();
        updateTaskCount();
        updateFilters();
      });

      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      input.classList.add("editable");
      input.addEventListener("input", function() {
        task.text = input.value;
        saveTasks();
      });

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.innerHTML = "&times;";
      deleteButton.addEventListener("click", function() {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
        updateFilters();
      });

      todoItem.appendChild(checkbox);
      todoItem.appendChild(input);
      todoItem.appendChild(deleteButton);

      return todoItem;
    }

    // Add a new task
    todoForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const text = todoInput.value.trim();
      if (text !== "") {
        tasks.push({
          text: text,
          completed: false
        });
        saveTasks();
        todoInput.value = "";
        renderTasks();
        updateFilters();
      }
    });

    // Save tasks to local storage
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Update the task count
    function updateTaskCount() {
      const remainingTasks = tasks.filter(task => !task.completed).length;
      taskCount.textContent = `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} remaining`;
    }

    // Update filter button states
    function updateFilters() {
      const activeFilter = document.querySelector(".filter-button.active");
      if (activeFilter) {
        const filter = activeFilter.dataset.filter;
        filterTasks(filter);
      }
    }

    // Filter tasks based on the given filter
    function filterTasks(filter) {
      const filteredTasks = tasks.filter(task => {
        if (filter === "active") {
          return !task.completed;
        } else if (filter === "completed") {
          return task.completed;
        }
        return true;
      });

      todoList.innerHTML = "";
      filteredTasks.forEach(function(task, index) {
        const todoItem = createTodoItem(task, index);
        todoList.appendChild(todoItem);
      });
    }

    // Toggle filter button states
    function toggleFilterButtons(button) {
      filterButtons.forEach(function(btn) {
        if (btn === button) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }

    // Handle filter button click events
    filterButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        const filter = button.dataset.filter;
        const action = button.dataset.action;

        if (action === "filter") {
          filterTasks(filter);
          toggleFilterButtons(button);
        }
      });
    });

    // Initial render
    renderTasks();
  });

   // Load saved note from local storage
   window.addEventListener('DOMContentLoaded', () => {
    const noteTextarea = document.getElementById('note-textarea');
    const savedNote = localStorage.getItem('note');
    if (savedNote) {
      noteTextarea.value = savedNote;
    }
  });

  // Save note to local storage
  const noteTextarea = document.getElementById('note-textarea');
  noteTextarea.addEventListener('input', () => {
    const note = noteTextarea.value;
    localStorage.setItem('note', note);
  });

  function switchTab(tabIndex) {
    // Get all tab content elements
    var tabContent = document.getElementsByClassName("tab");
  
    // Remove "active" class from all tab content elements
    for (var i = 0; i < tabContent.length; i++) {
      tabContent[i].classList.remove("active");
    }
  
    // Add "active" class to the selected tab content element
    tabContent[tabIndex].classList.add("active");
  
    // Get all nav items
    var navItems = document.getElementsByClassName("nav-item");
  
    // Remove "active" class from all nav items
    for (var i = 0; i < navItems.length; i++) {
      navItems[i].classList.remove("active");
    }
  
    // Add "active" class to the selected nav item
    navItems[tabIndex].classList.add("active");
  }
  
  
  