var app = app || {};

(function () {
	'use strict';

	var TodoFooter = app.TodoFooter;
	var TodoItem = app.TodoItem;

	var ENTER_KEY = 13;

	var TodoApp = React.createClass({
		getInitialState: function () {
			return {
				editing: null,
				viewType: 'All'
			};
		},

		handleNewTodoKeyDown: function (event) {
			if (event.keyCode !== ENTER_KEY) {
				return;
			}

			event.preventDefault();

			var val = React.findDOMNode(this.refs.newField).value.trim();

			if (val) {
				this.props.store.addTodo(val);
				React.findDOMNode(this.refs.newField).value = '';
			}
		},

		displayItems: function(item) {
			return (
				<section>
					<TodoItem
						item={item}
						handleToggle={this.handleToggle}
						handleDestroy={this.handleDestroy}
						handleEdit={this.handleEdit}
					/>
				</section>
			)
		},

		handleToggle: function(item) {
			this.props.store.toggle(item);
		},

		handleDestroy: function(item) {
			this.props.store.destroy(item)
		},

		handleEdit: function(item, text) {
			this.props.store.save(item, text)
		},

		handleViewChange: function (view) {
			this.setState({ viewType: view });
		},

		render: function () {
			var footer;
			var main;
			var todos = this.props.store.todos
			if (this.state.viewType !== 'All') {
				var completed = (this.state.viewType === 'Completed')
				todos = todos.filter(function(todo) {
					return todo.completed === completed;
				})
			}

			footer = <TodoFooter
        count={todos.length}
				viewType={this.state.viewType}
				handleViewChange={this.handleViewChange}
      />;

			main = (
				<section className="main">
					<ul className="todo-list">
						{todos.map(this.displayItems)}
					</ul>
				</section>
			);

			return (
				<div>
					<header className="header">
						<h1>My Todos</h1>
						<input
							ref="newField"
							className="new-todo"
							placeholder="What needs to be done?"
							onKeyDown={this.handleNewTodoKeyDown}
							autoFocus={true}
						/>
					</header>
					{main}
					{footer}
				</div>
			);
		}
	});

	var store = app.store = new app.TodoModel('react-todos');

	function render() {
		React.render(
			<TodoApp store={store}/>,
			document.getElementsByClassName('todoapp')[0]
		);
	}

  store.subscribe(render);
	render();
})();
