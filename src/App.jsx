import React, { Component } from 'react';
import styles from './App.scss';
import NoteList from './NoteList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  switchExpanded() {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  }

  render() {
    const {
      expanded,
    } = this.state;

    return (
      <div className={styles.App}>
        {expanded && <NoteList/>}
        <div className={styles['App-switcher']}
             onClick={() => this.switchExpanded()}>
          <span>{expanded ? '<' : '>'}</span>
        </div>
      </div>
    );
  }
}
