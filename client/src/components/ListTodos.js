import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo.js";

const ListTodos = () => {
	{
		/*<----------------------USESTATE----------------------------->*/
	}
	const [todos, setTodos] = useState([]);

	{
		/*<----------------------DELETE FUNCTION----------------------------->*/
	}

	const deleteTodo = async (id) => {
		try {
			const deleteTodo = await fetch(
				`http://localhost:5000/todos/${id}`,
				{
					method: "DELETE",
				}
			);

			console.log(deleteTodo);
			setTodos(todos.filter((todo) => todo.todo_id !== id));
		} catch (err) {
			console.log(err.message);
		}
	};

	{
		/*<----------------------GETTODOS----------------------------->*/
	}
	const getTodos = async () => {
		try {
			const response = await fetch("http://localhost:5000/todos");
			const jsonData = await response.json();
			console.log(jsonData);
			setTodos(jsonData);
		} catch (err) {
			console.log(err.message);
		}
	};

	{
		/*<----------------------USEEFFECT----------------------------->*/
	}

	useEffect(() => {
		getTodos();
	}, []);

	{
		/*<----------------------CONSOLE LOG----------------------------->*/
	}

	// console.log(todos);

	return (
		<>
			<table className="table mt-5 text-center">
				<thead>
					<tr>
						<th>Description</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{/*<tr>
							<td>John</td>
							<td>Doe</td>
							<td>john@example.com</td>
						</tr>*/}
					{todos.map((todo) => (
						<tr key={todo.todo_id}>
							<td>{todo.description}</td>
							<td>
								<EditTodo todo={todo} />
							</td>
							<td>
								<button
									className="btn btn-danger"
									onClick={() => {
										deleteTodo(todo.todo_id);
									}}
								>
									Remove
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default ListTodos;
