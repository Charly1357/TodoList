<>

    
        function addTodo(){
        document.addEventListener("DOMContentLoaded",function(){
            let title =documentgetElementById('todo-title').value;
            console.log(title);
            let data =documentgetElementById('date-picker').value;
            console.log(data);
            let time =documentgetElementById('hour-picker').value;
            console.log(time);

        });
    }
      // Model
      // If localstorage has a todos array, then use it
      // Otherwise use the default array.
      let todos;

      // Retrieve localStorage
      const savedTodos = JSON.parse(localStorage.getItem('todos'));
      // Check if it's an array
      if (Array.isArray(savedTodos)) {
        todos = savedTodos;
      } else {
        todos = [{
          title: 'Get groceries',
          dueDate: '2021-10-04',
          hour:'20.00',
          id: 'id1'
        }, {
          title: 'Wash car',
          dueDate: '2021-02-03',
          hour:'22.00',
          id: 'id2'
        }, {
          title: 'Make dinner',
          dueDate: '2021-03-04',
          hour:'23.00',
          id: 'id3'
        }];
      }

      // Creates a todo
      function createTodo(title, dueDate, dueHour) {
        const id = '' + new Date().getTime();

        todos.push({
          title: title,
          dueDate: dueDate,
          hour: dueHour,
          id: id
        });

        saveTodos();
      }

      // Deletes a todo
      function removeTodo(idToDelete) {
        todos = todos.filter(function (todo) {
          // If the id of this todo matches idToDelete, return false
          // For everything else, return true
          if (todo.id === idToDelete) {
            return false;
          } else {
            return true;
          }
        });

        saveTodos();
      }

      function setEditing(todoId) {
        todos.forEach(function (todo) {
          if (todo.id === todoId) {
            todo.isEditing = true;
          }
        });

        saveTodos();
      }

      function updateTodo(todoId, newTitle, newDate , newTime) {
        todos.forEach(function (todo) {
          if (todo.id === todoId) {
            todo.title = newTitle;
            todo.dueDate = newDate;
            todo.hour = newTime;
            todo.isEditing = false;
          }
        });

        saveTodos();
      }

      function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
      }

      // Controller
      function addTodo() {
        const textbox = document.getElementById('todo-title');
        const title = textbox.value;

        const datePicker = document.getElementById('date-picker');
        const dueDate = datePicker.value;

        const hourPicker =document.getElementById('hour-picker');
        const dueHour = hourPicker.value;

        createTodo(title, dueDate, dueHour);
        render();
      }

      function deleteTodo(event) {
        const deleteButton = event.target;
        const idToDelete = deleteButton.id;

        removeTodo(idToDelete);
        render();
      }

      // I forgot to mention: usually for these click handler function we like to name them
      // starting  with "on" (onAdd, onDelete, onEdit, etc.) I'll revise for the 2022 tutorial!
      function onEdit(event) {
        const editButton = event.target;
        const todoId = editButton.dataset.todoId;

        setEditing(todoId);
        render();
      }

      function onUpdate(event) {
        const updateButton = event.target;
        const todoId = updateButton.dataset.todoId;

        const textbox = document.getElementById('edit-title-' + todoId);
        const newTitle = textbox.value;

        const datePicker = document.getElementById('edit-date-' + todoId);
        const newDate = datePicker.value;

        const timePicker =document.getElementById('edit-time-' + todoId);
        const newTime = timePicker.value;

        updateTodo(todoId, newTitle, newDate , newTime);
        render();
      }

      // View
      function render() {
        // reset our list
        document.getElementById('todo-list').innerHTML = '';

        todos.forEach(function (todo) {
          const element = document.createElement('div');

          // If this todo is being edited, render a textbox, date picker and a
          // button for saving the edits.
          if (todo.isEditing === true) {
            const textbox = document.createElement('input');
            textbox.type = 'text';
            textbox.id = 'edit-title-' + todo.id;
            element.appendChild(textbox);

            const datePicker = document.createElement('input');
            datePicker.type = 'date';
            datePicker.id = 'edit-date-' + todo.id;
            element.appendChild(datePicker);

            const hourPicker = document.createElement('input');
            hourPicker.type ='time';
            hourPicker.id='edit-time-' + todo.id;
            element.appendChild(hourPicker);


            const updateButton = document.createElement('button');
            updateButton.innerText = 'Update';
            updateButton.dataset.todoId = todo.id;
            updateButton.onclick = onUpdate;
            element.appendChild(updateButton);

          // If this todo is not being edited, render what we had before
          // and add an "Edit" button.
          } else {
            element.innerText = todo.title + ' ' + todo.dueDate + ' ' + todo.hour;

            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.style = 'margin-left: 20px';
            editButton.onclick = onEdit;
            editButton.dataset.todoId = todo.id;
            element.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.style = 'margin-left: 20px';
            deleteButton.onclick = deleteTodo;
            deleteButton.id = todo.id;
            element.appendChild(deleteButton);
          }

          const todoList = document.getElementById('todo-list');
          todoList.appendChild(element);
        });
      }

      render();
    
 
 