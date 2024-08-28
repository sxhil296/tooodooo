import React, { useState } from "react";
import axios from "axios";

const CreateTodo = ({addTodo}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = async () => {
    const newTodo = {
      title,
      description,
      completed: false, 
    };

    try {
      // Post the new todo to the server
      const response = await axios.post('api/v1/todo', newTodo);
      // Add the new todo to the list in the parent component
      addTodo(response.data.todo);
      // Clear input fields after adding the todo
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("There was an error creating the todo!", error);
    }
  };
 
  return (
    <div className="flex flex-col gap-2 mb-10">
      <input type="text" placeholder="Title" className="px-4 py-2"  value={title}
        onChange={(e) => setTitle(e.target.value)}/>

      <input type="text" placeholder="Description" className="px-4 py-2" value={description}
        onChange={(e) => setDescription(e.target.value)} />

      <button
        className="px-4 py-2 bg-black text-white font-medium"
        onClick={handleAddTodo}
      >
        Add Todo
      </button>
    </div>
  );
};

export default CreateTodo;
