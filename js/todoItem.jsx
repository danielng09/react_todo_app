var app = app || {};

(function () {
	'use strict';

	app.TodoItem = React.createClass({

    // handle todo item here
		render: function () {
			var completed;
			if (this.props.item.completed) {
				completed = 'completed';
			}

			return (
				<li className={completed}>
					<div className="view">
						<input
							className="toggle"
							type="checkbox"
							checked={this.props.item.completed}
							onChange={this.props.handleToggle.bind(null, this.props.item)}
						/>
						<label cl>
							{this.props.item.title}
						</label>
						<button
							className="destroy"
							onClick={this.props.handleDestroy.bind(null, this.props.item)}
						/>
					</div>
					<input
						ref="editField"
						className="edit"
					/>
				</li>
			);
		}
	});
})();
