// Switch between pages
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
  
  
  // Wait for DOMContentLoaded event
  document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("todo-list");
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const taskCount = document.getElementById("task-count");
    const filterButtons = document.querySelectorAll(".filter-button");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
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
      todoItem.appendChild(deleteButton);
  
      return todoItem;
    }
  
    // Add a new task
    todoForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const text = todoInput.value.trim();
      if (text !== "") {
        const inputTasks = text.split('\n');
  
        inputTasks.forEach(function (taskText) {
          tasks.push({
            text: taskText,
            completed: false,
          });
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
      const remainingTasks = tasks.filter((task) => !task.completed).length;
      taskCount.textContent = `${remainingTasks} task${remainingTasks !== 1 ? "s" : ""} remaining`;
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
  
    // Initial render
    renderTasks();
  });

  // Your existing JavaScript code here

// Advanced-level JavaScript
function switchPage(pageId) {
    var pages = document.getElementsByClassName("page");
    var navItems = document.getElementsByClassName("nav-item");
  
    for (var i = 0; i < pages.length; i++) {
      pages[i].classList.remove("active");
    }
  
    for (var j = 0; j < navItems.length; j++) {
      navItems[j].classList.remove("active");
    }
  
    var currentPage = document.getElementById("page-" + pageId);
    var currentNavItem = document.querySelector('.nav-item[onclick="switchPage(\'' + pageId + '\')"]');
  
    currentPage.classList.add("active");
    currentNavItem.classList.add("active");
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    var todoForm = document.getElementById("todo-form");
    var todoInput = document.getElementById("todo-input");
    var todoList = document.getElementById("todo-list");
    var taskCount = document.getElementById("task-count");
  
    todoForm.addEventListener("submit", function(event) {
      event.preventDefault();
      var todoText = todoInput.value.trim();
  
      if (todoText !== "") {
        var listItem = document.createElement("li");
        listItem.className = "todo-item";
        listItem.innerHTML = `
          <span class="todo-text">${todoText}</span>
          <span class="delete-button">X</span>
        `;
        todoList.appendChild(listItem);
  
        todoInput.value = "";
        updateTaskCount();
      }
    });
  
    todoForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const task = todoInput.value;
        if (task.trim() !== "") {
          addTask(task);
          todoInput.value = "";
        }
      });
      
      function addTask(task) {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.innerHTML = `
          <input type="checkbox" class="checkbox" />
          <div class="todo-text">${task}</div>
          <button class="delete-button">Delete</button>
        `;
        todoList.appendChild(todoItem);
      
        // Trigger animation
        todoItem.classList.add("animate-in");
        todoItem.addEventListener("animationend", function () {
          todoItem.classList.remove("animate-in");
        });
      }
    
    todoList.addEventListener("click", function(event) {
      if (event.target.classList.contains("delete-button")) {
        var listItem = event.target.parentNode;
        listItem.parentNode.removeChild(listItem);
        updateTaskCount();
      }
    });
  

    
    function updateTaskCount() {
      var itemCount = todoList.children.length;
      taskCount.textContent = itemCount === 1 ? "1 task remaining" : itemCount + " tasks remaining";
    }
  });
  
  // Your existing JavaScript code here

  
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
  
  

  
  
  
  
