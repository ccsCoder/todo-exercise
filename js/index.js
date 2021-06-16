document.addEventListener('DOMContentLoaded', init);

function init() {
  // DOM is now 100% loaded
  attachEvents();
}

function attachEvents() {
  document.querySelector('.todo-items > ul').addEventListener('click', removeTodoItem);
  document.querySelector('#add-todo').addEventListener('click', addTodoItem);
}

function removeTodoItem(event) {
  if(event.target.tagName !== 'LI') return;
  event.target.classList.add('strike-through');
  console.log(this);
}

function addTodoItem(event) {
  const input = document.querySelector('.add-new-todo > input');
  const newToDoText = input.value;

  // validate my input
  const validationResult = validate(newToDoText);
  if (validationResult.status === false) {
    alert(validationResult.message);
    return;
  }

  // IN MEMORY
  // Create a new List item
  const newListItem = document.createElement('li');

  // set the text of li to input.value
  newListItem.innerText = newToDoText;

  // append to incomplete TODO Ul
  document.querySelector('.todo-items > ul').appendChild(newListItem);
}


const validate = todoText => {
  const result = {
    status: true,
    message: ''
  };

  // valid input in terms of text content
  if(todoText.trim().length === 0) {
    result.message = 'Please enter valid text';
    result.status = false;
    return result;
  }

  // check duplicates
  const allListItems = document.querySelectorAll('.todo-items li');
  const listItemsArray = Array.prototype.slice.call(allListItems);

  if (listItemsArray.some(listItem => listItem.innerText === todoText)) {
    result.message = 'Please do not enter duplicate items';
    result.status = false;
    return result;
  }

  return result;
}
