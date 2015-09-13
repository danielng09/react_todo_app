var app = app || {};

(function () {
	'use strict';

	app.TodoFooter = React.createClass({
		findCount: function () {
			return this.props.todos.length
		},

		countType: function () {
			if (this.props.viewType === 'All') {
				return 'total'
			} else {
				return this.props.viewType.toLowerCase();
			}
		},

		render: function () {
			var activeTodoWord = app.Utils.pluralize(this.props.count, 'item');
			var cx = React.addons.classSet;
			return (
				<footer className="footer">
					<span className="todo-count">
						<strong>{this.props.count}</strong> {activeTodoWord} {this.countType()}
					</span>
					<ul className='filters'>
						<li>
							<a href='#'
								 className={cx({ selected: this.props.viewType === 'All'})}
								 onClick={this.props.handleViewChange.bind(null, 'All')}>
								 All</a>
						</li>

						<li>
							<a href='#'
								 className={cx({ selected: this.props.viewType === 'Active'})}
								 onClick={this.props.handleViewChange.bind(null, 'Active')}>
								 Active</a>
						</li>

						<li>
							<a href='#'
								 className={cx({ selected: this.props.viewType === 'Completed'})}
								 onClick={this.props.handleViewChange.bind(null, 'Completed')}>
								 Completed</a>
						</li>
					</ul>

					<button className='clear-completed' onClick={this.props.handleClear}>Clear completed</button>
				</footer>
			);
		}
	});
})();
