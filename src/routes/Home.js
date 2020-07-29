import React, { useState } from "react";
import { connect } from "react-redux";
import { add } from "../store";
import ToDo from "../components/ToDo";

function Home({ toDos, addToDo }) {
  const [text, setText] = useState("");
  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    addToDo(text);
    setText("");
  }
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={text}
          placeholder="To Do"
          onChange={onChange}
        ></input>
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
}

function mapStatetoProps(state) {
  return { toDos: state };
}

function mapDisptachToProps(dispatch) {
  return {
    addToDo: (text) => dispatch(add(text)),
  };
}

export default connect(mapStatetoProps, mapDisptachToProps)(Home);
