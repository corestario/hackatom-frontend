export const state = () => ({
  config: {
    zone1Node: '/apiZone',
    zone2Node: '/apiHub',
    chainId: 'NFTChain',
  },
})

export const mutations = {}

export const actions = {
  // server pre init
  async nuxtServerInit({ commit, dispatch }, { req, app }) {
    await dispatch('user/loadUserInfo')
  },
}
