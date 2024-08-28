import "dotenv/config";
import express from "express";
// import  createTodo  from "./types.js";
// import  updateTodo from './types.js'
import schemas from "./types.js"; // Import the default export
const { createTodo, updateTodo } = schemas; // Destructure to get the schemas
import { Todo } from "./db.js";


const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

//CREATE TODO
app.post("/todo", async (req, res) => {
  const createPayLoad = req.body;
  const parsedPayLoad = createTodo.safeParse(createPayLoad);
  if (!parsedPayLoad.success) {
    res.status(411).json({ msg: "wrong inputs" });
    return;
  }

  await Todo.create({
    title: createPayLoad.title,
    description: createPayLoad.description,
    completed: false,
  });

  res.json({
    msg: "Todo created",
  });
});

//GET ALL TODOS
app.get("/todos", async (req, res) => {
  const todos = await Todo.find({});
  console.log(todos);
  res.json({
    todos,
  });
});

//MARK A TODO AS DONE
app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayLoad = updateTodo.safeParse(updatePayload);
  if (!parsedPayLoad.success) {
    res.status(411).json({ msg: "wrong inputs" });
    return;
  }
  const todo = await Todo.updateOne(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  
  res.json({
    msg: "Todo marked as done",
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
