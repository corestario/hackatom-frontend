export default {
  setUser(state, {
    id = null,
    // mnemonic = null,
    name = null,
    address = null,
    password = null
  }) {
    if (id !== null && id < state.accounts.length) {
      state.accounts.splice(id, 1, { name, address, password })
      state.currentId = id
    } else {
      state.currentId = state.accounts.length
      state.accounts.push({ name, address, password })
    }
  },
  setCurrentUser(state, id = 0) {
    if (id < state.accounts.length) {
      state.currentId = id
      return true
    }
    return false
  },
  delCurrentUser(state) {
    state.accounts.splice(state.currentId, 1)
  },
  userInfo(state, info) {
    state.currentUserInfo = {
      account_number: info.account_number || "0",
      sequence: info.sequence || "0",
    }
  },
  userHubInfo(state, info) {
    state.currentUserHubInfo = {
      account_number: info.account_number || "0",
      sequence: info.sequence || "0",
    }
  },
}
