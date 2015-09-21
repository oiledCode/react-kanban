import uuid from 'node-uuid';
import alt from '../libs/Alt';
import NoteActions from '../Actions/NoteActions';

// Understand the naming conventions
class NoteStore {
	constructor(){
		this.bindActions(NoteActions);
		this.notes = [];

		// Bindings
		this.findNoteIndex = this.findNoteIndex.bind(this); 
	}

	createNote(note) {
		const notes = this.notes;
		
		note.id = uuid.v4();
		
		this.setState({
			notes: notes.concat(note)
		});
	}

	updateNote({id, task}){
		const notes   = this.notes;
		let noteIndex = this.findNoteIndex(notes, id);

		if (noteIndex >= 0) {
			notes[noteIndex].task = task;
			this.setState({
				notes: notes
			});
		}
	}

	deleteNote(id){
		const notes   = this.notes;
		let noteIndex = this.findNoteIndex(notes, id);
		
		if (noteIndex >= 0) {
			notes.splice(noteIndex, 1);
			this.setState({
				notes: notes
			});
		}
	}

	/*
	 * Utility method
	 */
	findNoteIndex(notes, noteId) {
		let idx = -1;
		for(let [index, element] of notes.entries()) {
			if (element.id === noteId) return index;
		}
		return idx;
	}
}

export default alt.createStore(NoteStore, 'NoteStore');