// import {createQueryString} from `./util`;
let accessToken;

// function for creating encoded query parameter string out of an object
const createQueryString = paramsObj =>
  Object.keys(paramsObj)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(paramsObj[key]);
    })
    .join('&');

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // no accesstoken in memory, present in URL hash?
    const urlAccessToken = window.location.hash.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.hash.match(/expires_in=([^&]*)/);

    if (urlAccessToken && urlExpiresIn) {
      // Reset access token in url after expiration
      accessToken = urlAccessToken[1];
      const expiresIn = urlExpiresIn[1];
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const url = 'https://accounts.spotify.com/authorize';
      const queryParams = {
        client_id: '5fd87456058f40e0af1dc9840fabb1d0',
        response_type: 'token',
        // be sure to add http://localhost:3000/ to redirect URIs
        // for in the settings for the app on the Spotify dashboard
        redirect_uri: 'http://localhost:3000/',
        scope: 'playlist-modify-public',
      };
      const queryParamsString = createQueryString(queryParams);
      window.location = `${url}?${queryParamsString}`;
    }
  },

  async search(searchTerm) {
    this.getAccessToken();
    try {
      const response = await fetch(
        'https://api.spotify.com/v1/search?type=track&q=' + searchTerm,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        const tracks = jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
        return tracks;
      }
      throw new Error('Request failed!');
    } catch (error) {
      console.error(error);
    }
  },

  savePlayList(playListName, playListTracks) {
    if (playListName && playListTracks.length) {
      this.getAccessToken();
      // Get user
      fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then(response => {
          return response.json();
        })
        .then(jsonResponse => {
          return jsonResponse.id;
        })
        // Create new playlist
        .then(userId => {
          fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: playListName,
            }),
          })
            .then(response => {
              return response.json();
            })
            .then(jsonResponse => {
              return jsonResponse.id;
            })
            // Add uris to playlist
            .then(playListId => {
              const uris = playListTracks.map(playListTrack => {
                return `spotify:track:` + playListTrack.id;
              });
              fetch(
                `https://api.spotify.com/v1/playlists/${playListId}/tracks`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                  },
                  method: 'POST',
                  body: JSON.stringify({
                    uris: uris,
                  }),
                }
              );
            });
        })
        // Will this catch errors for all fetch requests?
        .catch(error => console.error('Error:', error));
    }
  },
};

export default Spotify;
