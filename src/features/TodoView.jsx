import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { added, deleted, updated } from "./todoSlice";

const TodoView = () => {
  const [item, setItem] = useState("");
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  let dispatch = useDispatch();
  let state = useSelector((state) => state.todo);
  const itemAdd = (e) => {
    setItem(e.target.value);
  };

  const clicked = (e) => {
    e.preventDefault();
    if (item && !toggleSubmit) {
      const updatedArray = state.list.map((elem) => {
        if (elem.id === isEditItem) {
          console.log("inside edit");
          return { ...elem, data: item };
        }
        return elem;
      });
      console.log(updatedArray);
      dispatch(updated(updatedArray));
      setItem("");
      setIsEditItem(null);
      setToggleSubmit(true);
    } else if (item) {
      dispatch(added({ data: item, id: new Date().getTime().toString() }));
      setItem("");
    }
  };

  const remove = (index) => {
    dispatch(deleted(index));
  };
  const update = (id) => {
    const editingElem = state.list.find((elem) => elem.id === id);
    setItem(editingElem.data);
    setIsEditItem(id);
    setToggleSubmit(false);
  };
  return (
    <>
      <input type="text" value={item} onChange={(e) => itemAdd(e)} />
      <button onClick={(e) => clicked(e)}>
        {toggleSubmit ? "Add" : "Edit"}
      </button>
      {state.list.map((elem, id) => {
        return (
          <ul key={id}>
            <li>
              {elem.data}
              <button onClick={() => remove({ id: elem.id })}>delete</button>
              <button onClick={() => update(elem.id)}>update</button>
            </li>
          </ul>
        );
      })}
    </>
  );
};

export default TodoView;
