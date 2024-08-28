import React from "react";

const Todos = ({ todos }) => {
  return (
    <>
      {todos.map((todo) => (
        <div key={todo._id} className="flex gap-4 mb-2">
          <div>
            <h2 className="text-xl font-medium">{todo.title}</h2>
            <h3 className="text-lg font-medium">{todo.description}</h3>
          </div>
          <button className="px-2  bg-blue-600 text-white rounded-md">
            {todo.completed === false ? "Mark as Done" : "Completed"}
          </button>
        </div>
      ))}
    </>
  );
};

export default Todos;
