import { useEffect, useState } from "react";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/todos")
      .then((response) => {
        console.log(response.data); 
    
        setTodos(response.data.todos);
      })
      .catch((error) => {
        console.error("There was an error fetching the todos!", error);
      });
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="flex justify-center mt-10 mx-auto flex-col items-center">
      <h1 className="text-3xl font-bold mb-10">tooodooo</h1>
      <CreateTodo addTodo={addTodo}/>
      <Todos todos={todos}/>
    </div>
  );
}

export default App;
