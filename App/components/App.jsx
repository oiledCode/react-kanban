/*
 *
 *
 * Application main component
 *
 */
import React from 'react';
import uuid  from 'node-uuid';

import Notes from './Notes.jsx'

import NoteActions from '../Actions/NoteActions';
import NoteStore from '../Stores/NoteStore';

export default class App extends React.Component {
	// constructor
	constructor(props) {
		super(props);

		this.state = NoteStore.getState();
		
		// Binding
		this.storeChanged = this.storeChanged.bind(this);
	// 	this.addNote       = this.addNote.bind(this);
	// 	this.editNote      = this.editNote.bind(this);
	// 	this.deleteNote    = this.deleteNote.bind(this);
	// 	this.findNoteIndex = this.findNoteIndex.bind(this);
	}

	componentDidMount() {
		NoteStore.listen(this.storeChanged);
	}

	componentWillUnMount() {
		NoteStore.unListen(this.storeChanged);
	}

	storeChanged(state) {
		this.setState(state);
	}

	render() {
		return (
			<div>
				<button className='add-note' onClick={this.addNote}>+</button>
				<Notes 
					items={this.state.notes}
					onEdit={this.editNote} 
					onDelete={this.deleteNote}
				/>
			</div>
		);
	}

	addNote() {
		NoteActions.createNote({task: 'new task'});
	}

	editNote(id, task) {
		NoteActions.updateNote({id, task});

	}

	deleteNote(id) {
		NoteActions.deleteNote(id);
	}

}