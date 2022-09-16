import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { added, deleted, updated } from "./todoSlice";



const TodoView = () => {
  const [selected, setSelected] = useState("All");
  const [item, setItem] = useState("");
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const handlepick = (e) => {
    setSelected(e.target.name);
  };

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
    <><br /><br />
    <p>please enter your list</p>
      <input type="text" value={item} onChange={(e) => itemAdd(e)} />
      <button onClick={(e) => clicked(e)}>
        {toggleSubmit ? "Add" : "Edit"}
      </button><br /><br />
      <div>
              <button className={`btn add ms-2 ${selected === "All" ? "btn-info add" : "btn add"}`} name="All" type="button" onClick={handlepick}>
                All
              </button>
              <button className={`btn add ms-2 ${selected === "Active" ? "btn-info add" : "btn add"}`} name="Active" type="button" onClick={handlepick}>
                Active
              </button>
              <button className={`btn add ms-2 ${selected === "Completed" ? "btn-info add" : "btn add"}`} name="Completed" type="button" onClick={handlepick}>
                Completed
              </button>
            </div>
      {state.list.map((elem, id) => {
        return (
          <div className="container">
          <ul key={id}>
            <li>
              {elem.data}
              <button onClick={() => remove({ id: elem.id })}>delete</button>
              <button onClick={() => update(elem.id)}>update</button>
            </li>
          </ul>
          </div>
        );
      })}
    </>
  );
};

export default TodoView;
