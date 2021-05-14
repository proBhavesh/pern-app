import React from "react";
import InputTodo from "./components/InputTodo.js";
import ListTodos from "./components/ListTodos.js";

const App = () => {
	return (
		<div>
			<div className="container">
				<InputTodo />
				<ListTodos />
			</div>
		</div>
	);
};

export default App;
