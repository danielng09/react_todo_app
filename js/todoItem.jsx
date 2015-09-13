var app = app || {};

(function () {
	'use strict';

	app.TodoItem = React.createClass({

    // handle todo item here

		render: function () {
			return (
				<li>
					<div className="view">
						<input
							className="toggle"
							type="checkbox"
							checked={this.props.item.completed}
							onChange={this.props.handleToggle.bind(null, this.props.item)}
						/>
						<label>
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
