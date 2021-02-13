import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'assets/layout/data',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default class EventService {
    getEvents() {
        return apiClient.get('/events.json')
        .then(res => res.data.data)
    }
    postEvent(event) {
      return axios.post('/events.json', event)
  }
}
