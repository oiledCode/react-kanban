import React from 'react';

export default class Note extends React.Component {

	constructor(props) {
		super(props);

		// Binding
		this.finishEdit = this.finishEdit.bind(this);
		this.checkEnter = this.checkEnter.bind(this);
		this.renderEdit = this.renderEdit.bind(this);
		this.renderTask = this.renderTask.bind(this);
		this.edit       = this.edit.bind(this);

		this.state = {
			editing: false
		};
	}
	
	render() {
		return <div>{this.state.editing ? this.renderEdit() : this.renderTask()}</div>;
	}

	renderDelete() {
		return (
			<button className='delete-button' onClick={this.props.onDelete}>delete</button>
		)
	}
	
	renderTask() {
		return (
			<div onClick={this.edit}>
				<span className='task'>{this.props.task}</span>
				{this.props.onDelete ? this.renderDelete() : null}
			</div>
		 )
	}

	renderEdit() {
		return (
			<input type='text'
				autofocus={true}
				defaultValue={this.props.task}
				onBlur={this.finishEdit}
				onKeyPress={this.checkEnter}
			/>
		);
	}

	edit() {
		this.setState({
			editing: true
		});
	}

	checkEnter(event) {
		if(event.key === 'Enter') {
			this.finishEdit(event);
		}
	}

	finishEdit(event) {
		this.props.onEdit(event.target.value);
		this.setState({
			editing: false
		});
	}
}