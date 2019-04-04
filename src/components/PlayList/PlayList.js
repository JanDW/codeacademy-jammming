import React from 'react';
import TrackList from '../TrackList/TrackList';
import './PlayList.css';

class PlayList extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="PlayList">
        <input
          value={this.props.playListName}
          onChange={this.handleNameChange}
        />
        <TrackList
          tracks={this.props.playList}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <button className="PlayList-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}

export default PlayList;
