import { createStore } from 'vuex'
import EventService from "../service/EventService.js"

export default createStore({
  state() {
    return {
      events: [],
      event: {},
      eventTotal: 0
    }
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
      return EventService.getEvents()
      .then(response => {
        commit('SET_EVENTS', response.data)
      })
    },
    createEvent({ commit }, event) {
      return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
      })
    }
  }
})
