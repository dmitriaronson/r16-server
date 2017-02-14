import fetch from 'isomorphic-fetch';

export default class Soundcloud {
  constructor(clientId) {
    this.clientId = clientId;
  }

  search(q) {
    const url = `https://api.soundcloud.com/tracks?q=${q}&client_id=${this.clientId}`;

    return fetch(url).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then(tracks => tracks);
  }
}
