export function setUser({ commit }, { id = null, name = null, address = null, password = null }) {
  commit('setUser', { id, name, address, password })
  return Promise.resolve()
}

export function setCurrentUser({ commit, dispatch }, id) {
  commit('setCurrentUser', id)
  return Promise.resolve()
  // return dispatch('loadUserInfo')
}

export function delCurrentUser({ commit }) {
  commit('delCurrentUser')
  return Promise.resolve()
}

export function loadUserInfo({ commit, state, getters, rootState }) {
  if (getters.currentUser === null) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    return Promise.all([
      this.$axios.$get(rootState.config.zone1Node + '/auth/accounts/' + getters.currentUser.address),
      this.$axios.$get(rootState.config.zone2Node + '/auth/accounts/' + getters.currentUser.address),
    ])
      .then(responses => {
        // console.log(response.Account)
        commit('userInfo', response.value)
        resolve()
      })
      .catch(e => {
        console.error('zone1 auth/accounts', e)
        reject(e)
      })
  })
}
export function loadHubUserInfo({ commit, state, getters, rootState }) {
  if (getters.currentUser === null) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    this.$axios
      .$get(rootState.config.zone2Node + '/auth/accounts/' + getters.currentUser.address)
      .then(response => {

        commit('userHubInfo', response.value)
        resolve()
      })
      .catch(e => {
        console.error('zone2 auth/accounts', e)
        reject(e)
      })
  })
}


