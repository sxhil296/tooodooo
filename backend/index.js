import "dotenv/config";
import express from "express";
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());



app.post("/todo", (req, res) => {
    res.send("Hello World!");
})

app.get("/todos", (req, res) => {
    res.send("Tooodooo!");
})

app.put("/completed", (req, res) => {
    res.send("Completed!");
})

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
