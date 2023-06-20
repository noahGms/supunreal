import { Preferences } from '@capacitor/preferences';
import { API_AUTH_URL } from '../../constants';
import axios from 'axios';

export const auth = {
  namespaced: true,
  state: () => ({
    user: null,
    loggedIn: false,
    token: null,
  }),
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios.post(`${API_AUTH_URL}/login`, credentials)
          .then((response) => {
            commit('setToken', response.data.token);
            commit('setLoggedIn', true);
            Preferences.set({ key: 'token', value: response.data.token_bearer });

            axios.defaults.headers.common.Authorization = `Bearer ${response.data.token_bearer}`;

            resolve(response);
          })
          .catch((error) => {
            commit('setUser', null);
            commit('setLoggedIn', false);
            commit('setToken', null);

            reject(error);
          });
      });
    },
    whoami({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(`${API_AUTH_URL}/whoami`)
          .then((response) => {
            commit('setUser', response.data.data);
            commit('setLoggedIn', true);

            resolve(response);
          })
          .catch((error) => {
            commit('setUser', null);
            commit('setLoggedIn', false);

            reject(error);
          });
      });
    },
    logout({ commit }) {
      commit('setUser', null);
      commit('setLoggedIn', false);
      commit('setToken', null);
      Preferences.remove({ key: 'token' });
    },
  },
  getters: {
    getAuthenticatedUser: (state) => state.user,
    isLoggedIn: (state) => state.loggedIn,
    tokenValid: (state) => state.token !== null,
  },
}