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
			var node = this.refs.editField.getDOMNode()
			node.focus();
			node.setSelectionRange(node.value.length, node.value.length);
		},

		changeEditView: function () {
			this.setState({ editView: !this.state.editView })
		},

		handleSubmitEdit: function (event) {
			event.preventDefault();
			this.changeEditView();
			this.props.handleEdit.apply(null, [this.props.item, this.state.text])
		},

		handleTextEdit: function (event) {
			var text = event.target.value;
			this.setState({ text: text })
		},

		escapeEdit: function (event) {
			if (this.state.editView) {
				this.handleSubmitEdit(event);
				this.changeEditView();
			}
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
				<li className={style.join(' ')}>
					<div className="view">
						<input
							className="toggle"
							type="checkbox"
							checked={this.props.item.completed}
							onChange={this.props.handleToggle.bind(null, this.props.item)}
						/>
						<label onDoubleClick={this.changeEditView}>
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
						onBlur={this.escapeEdit}
					/>
					</form>
				</li>
			);
		}
	});
})();
