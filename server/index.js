const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");
// middleware
app.use(express.json());
app.use(cors());

//Routes

// create

app.post("/todos", async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			"INSERT INTO todo (description) VALUES($1) RETURNING *",
			[description]
		);

		res.json(newTodo.rows[0]);
	} catch (err) {
		console.log(err.message);
	}
});

// get all

app.get("/todos", async (req, res) => {
	try {
		const allTodos = await pool.query("SELECT * FROM todo");
		res.json(allTodos.rows);
	} catch (err) {
		console.log(err.message);
	}
});

//get single
app.get("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
			id,
		]);
		if (todo.rowCount === 0) {
			return res.json("Data doesn't exist");
		} else {
			res.json(todo);
		}
	} catch (err) {
		console.log(err.message);
	}
});
//update
app.put("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;

		const updateTodo = await pool.query(
			"UPDATE todo SET description = $1 WHERE todo_id = $2",
			[description, id]
		);

		res.json("Content is updated");
	} catch (err) {
		console.log(err.message);
	}
});

//delete

app.delete("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deleteTodos = await pool.query(
			"DELETE FROM todo WHERE todo_id = $1",
			[id]
		);
		res.json("todos are deleted");
	} catch (err) {
		console.log(err.message);
	}
});

//delte all

app.delete("/todos", async (req, res) => {
	try {
		const deleteTodos = await pool.query("DELETE FROM todo RETURNING *");
		res.json("todos are deleted");
	} catch (err) {
		console.log(err.message);
	}
});

app.listen(5000, () => {
	console.log("Server working");
});
