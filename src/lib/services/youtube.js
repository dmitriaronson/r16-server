import fetch from 'isomorphic-fetch';

export default class Youtube {
  constructor(key) {
    this.key = key;
  }

  search(q) {
    const url = `https://content.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&key=${this.key}`;

    return fetch(url).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then(tracks => tracks);
  }
}
