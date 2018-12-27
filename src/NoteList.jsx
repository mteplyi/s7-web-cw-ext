import React, { Component } from 'react';
import styles from './NoteList.scss';
import * as notesApi from './utils/notes-api';

export default class NoteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      loading: true,
      notes: [],
      newNoteText: '',
    };
  }

  componentDidMount() {
    notesApi.get()
      .then((notes) => {
        console.log('GET:', notes);
        this.setState({
          loading: false,
          notes,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          error,
          loading: false,
        });
      });
  }

  handleEdit(note, text) {
    const { notes } = this.state;

    const updatedNotes = [...notes];
    updatedNotes[notes.indexOf(note)] = {
      ...note,
      text,
      edited: true,
    };

    this.setState({ notes: updatedNotes });
  }

  handleEditingEnd(note) {
    if (!note.edited) {
      return;
    }

    const { notes } = this.state;
    const { text } = note;

    const updatedNotes = [...notes];

    const trimmedText = text.trim();
    if (!trimmedText) {
      updatedNotes.splice(notes.indexOf(note), 1);
      this.setState({ notes: updatedNotes });

      notesApi.remove(note)
        .catch((error) => {
          console.error(error);
          this.setState({ error });
        });
      return;
    }

    const updatedNote = {
      ...note,
      edited: false,
    };
    if (trimmedText !== text) {
      updatedNote.text = trimmedText;
    }
    updatedNotes[notes.indexOf(note)] = updatedNote;
    this.setState({ notes: updatedNotes });

    notesApi.update(updatedNote)
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  handleNewNoteTextEdit(text) {
    this.setState({ newNoteText: text });
  }

  handleNewNoteTextEditingEnd() {
    const {
      notes,
      newNoteText,
    } = this.state;

    const stateUpdate = { newNoteText: '' };

    const trimmedNewNoteText = newNoteText.trim();
    if (trimmedNewNoteText) {
      const newNote = {
        id: Math.random(),
        text: trimmedNewNoteText,
        disabled: true,
      };
      stateUpdate.notes = [...notes, newNote];

      notesApi.create(newNote)
        .then((postedBackNote) => {
          const {
            notes: freshNotes,
          } = this.state;

          const freshNoteIndex = freshNotes.findIndex(({ id }) => id === newNote.id);
          if (freshNoteIndex === -1) {
            return;
          }

          const newNotes = [...freshNotes];
          newNotes[freshNoteIndex] = {
            ...newNotes[freshNoteIndex],
            ...postedBackNote,
            disabled: false,
          };

          this.setState({ notes: newNotes });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ error });
        });
    }

    this.setState(stateUpdate);
  }

  render() {
    const {
      error,
      loading,
      notes,
      newNoteText,
    } = this.state;

    if (error) {
      return (
        <div className={styles['NoteList-message']}>
          Something went wrong...
        </div>
      );
    }
    if (loading) {
      return (
        <div className={styles['NoteList-message']}>
          Loading...
        </div>
      );
    }
    return (
      <ul className={styles['NoteList-list']}>
        {notes.map((note) => (
          <li key={note.id}
              className={styles['NoteList-item']}>
            <input type="text"
                   value={note.text}
                   placeholder="Remove?"
                   disabled={note.disabled}
                   onChange={(e) => this.handleEdit(note, e.target.value)}
                   onBlur={() => this.handleEditingEnd(note)}
                   onKeyPress={(e) => e.key === 'Enter' && this.handleEditingEnd(note)}/>
          </li>
        ))}
        <li className={styles['NoteList-item']}>
          <label>
            <input type="text"
                   placeholder="Note..."
                   value={newNoteText}
                   onChange={(e) => this.handleNewNoteTextEdit(e.target.value)}
                   onBlur={() => this.handleNewNoteTextEditingEnd()}
                   onKeyPress={(e) => e.key === 'Enter' && this.handleNewNoteTextEditingEnd()}/>
          </label>
        </li>
      </ul>
    );
  }
}
