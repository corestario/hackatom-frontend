export function setUser({ commit }, { id = null, name = null, address = null, password = null }) {
  commit('setUser', { id, name, address, password })
  return Promise.resolve()
}

export function setCurrentUser({ commit, dispatch }, id) {
  commit('setCurrentUser', id)
  return dispatch('loadUserInfo')
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
    this.$axios
      .$get(rootState.config.node + '/auth/accounts/' + getters.currentUser.address)
      .then(response => {
        console.log(response)
        commit('userInfo', response.value)
        resolve()
      })
      .catch(e => {
        console.error('auth/accounts', e)
        reject(e)
      })
  })
}


