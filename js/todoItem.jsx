var app = app || {};

(function () {
	'use strict';

	app.TodoItem = React.createClass({
		getInitialState: function () {
			return (
				{ editView: false, text: this.props.item.title }
			);
		},

		componentDidUpdate: function () {
			this.refs.editField.getDOMNode().focus();
		},

		changeEditView: function () {
			this.setState({ editView: !this.state.editView })
		},

		handleSubmitEdit: function (event) {
			event.preventDefault();
			this.changeEditView();
			this.props.handleEdit.apply(null, [this.props.item, this.state.text])
			console.log('was here!')
		},

		handleTextEdit: function (event) {
			var text = event.target.value;
			this.setState({ text: text })
		},

    // handle todo item here
		render: function () {
			var style = [];
			if (this.props.item.completed) {
				style.push('completed');
			}
			if (this.state.editView) {
				style.push('editing')
			}

			return (
				<li className={style.join(' ')} onDoubleClick={this.changeEditView}>
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
					<form onSubmit={this.handleSubmitEdit}>
					<input
						ref="editField"
						className="edit"
						value={this.state.text}
						onChange={this.handleTextEdit}
					/>
					</form>
				</li>
			);
		}
	});
})();
