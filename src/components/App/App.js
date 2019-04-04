import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playListName: 'New PlayList',
      playListTracks: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (
      // track not in playlist?
      this.state.playListTracks.find(
        playListTrack => playListTrack.id === track.id
      ) === undefined
    ) {
      this.setState(state => state.playListTracks.push(track));
    } else {
      console.log('already in list');
    }
  }

  removeTrack(track) {
    const updatedPlayList = this.state.playListTracks.filter(
      playListTrack => playListTrack.id !== track.id
    );
    this.setState({
      playListTracks: updatedPlayList,
    });
  }

  updatePlayListName(playListName) {
    this.setState({ playListName: playListName });
  }

  savePlayList() {
    debugger;
    Spotify.savePlayList(this.state.playListName, this.state.playListTracks);

    // @TODO Clearly I should await the outcome for .savePlayList, but using .then() doesn't work
    this.setState({
      playListName: 'New PlayList',
      playListTracks: [],
    });
  }
  search(searchTerm) {
    Spotify.search(searchTerm).then(tracks =>
      this.setState({ searchResults: tracks })
    );
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <PlayList
              playList={this.state.playListTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlayListName}
              onSave={this.savePlayList}
              playListName={this.state.playListName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
