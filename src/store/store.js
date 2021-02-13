import { createStore } from 'vuex'
import EventService from "@/service/EventService"
import axios from 'axios'

export default createStore({
  state: {
    events: [],
    event: {},
    eventTotal: 0
  },
  mutations: {
    SET_EVENTS(state, events) {
      state.events = events
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    fetchEvents({ commit }) {
axios.get('assets/layout/data/events.json').then(response => {commit('SET_EVENTS', response.data.data)})
      // EventService.getEvents()
      // .then(response => {
      //   commit('SET_EVENTS', response.data)
      // })
    },
    createEvent({ commit }, event) {
      EventService.postEvent(event)
      commit('ADD_EVENT', event)
    }
  }
})
