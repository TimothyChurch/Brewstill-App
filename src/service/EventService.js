import axios from 'axios';

export default class EventService {

    getEvents() {
        return axios.get('http://10.145.1.250:1880/events').then(res => res.data.data);
    }
    postEvents() {
      axios.post('http://10.145.1.250:1880/events', event)
  .then(function (response) {
    console.log(response);
  })
    }
}
