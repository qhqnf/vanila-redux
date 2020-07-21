import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const toDoList = document.querySelector("ul");

const ADD_TODO = "Add to Do";
const DELETE_TODO = "Delete to Do";

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const toDoReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state];
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const toDoStore = createStore(toDoReducer);

toDoStore.subscribe(() => {
  console.log(toDoStore.getState());
});

const dispatchAddToDo = (text) => {
  toDoStore.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (event) => {
  const id = parseInt(event.target.parentNode.id);
  toDoStore.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = toDoStore.getState();
  toDoList.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.addEventListener("click", dispatchDeleteToDo);
    btn.innerText = "DELETE";
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    toDoList.appendChild(li);
  });
};

toDoStore.subscribe(paintToDos);

const handleSubmit = (event) => {
  event.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", handleSubmit);
