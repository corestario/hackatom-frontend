export function loadUserTokens({ commit, state, getters, rootState, rootGetters }) {
  if (rootGetters['user/currentUser'] === null) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    this.$axios
      .$get(rootState.config.zone1Node + '/nftapp/nft/list/' + rootGetters['user/currentUser'].address + '/')
      .then(response => {
        commit('userTokens', response)
        resolve()
      })
      .catch(e => {
        console.error('zone1 nftapp/nft/list', e)
        reject(e)
      })
  })
}
export function loadHubTokens({ commit, state, getters, rootState, rootGetters }) {
  // return Promise.resolve()

  if (rootGetters['user/currentUser'] === null) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    this.$axios
      // todo change api url
      // get all available tokens
      .$get(rootState.config.zone2Node + '/nftapp/nft/list/' + rootGetters['user/currentUser'].address + '/')
      .then(response => {
        console.log('hub tokens', response)
        commit('hubTokens', response)
        resolve()
      })
      .catch(e => {
        console.error('zone2 nftapp/nft/list', e)
        reject(e)
      })
  })
}

export function createToken({ commit, state, getters, rootState, rootGetters }, tokenInfo) {
  if (rootGetters['user/currentUser'] === null) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    // curl -s -XPOST http://localhost:1317/nftapp/nft --data-binary '{"base_req":{"from":"cosmos1np0wt2u949r3k6r5km023c6w5vp5dedyrglld9","chain_id":"NFTChain", "account_number": "0", "sequence": "3" },"token_name":"alpha","description":"beta","image":"gamma","token_uri":"kappa","owner":"cosmos1np0wt2u949r3k6r5km023c6w5vp5dedyrglld9", "name": "validator1", "password": "Committed"}'
    this.$axios
      .$post(rootState.config.zone1Node + '/nftapp/nft', {
        base_req: {
          from: rootGetters['user/currentUser'].address,
          chain_id: rootState.config.chainId,
          account_number: rootGetters['user/currentUser'].account_number,
          sequence: rootGetters['user/currentUser'].sequence,
        },
        token_name: tokenInfo.name,
        description: tokenInfo.description,
        image: tokenInfo.image,
        token_uri: tokenInfo.url,
        owner: rootGetters['user/currentUser'].address,
        name: rootGetters['user/currentUser'].name,
        password: rootGetters['user/currentUser'].password,
      })
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        console.error('nftapp/nft/transfer', e)
        reject(e)
      })
  })
}

export function transferTokenToHub({ commit, state, getters, rootState, rootGetters }, { tokenId, price }) {
  if (rootGetters['user/currentUser'] === null) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    // curl -s -XPOST http://localhost:1317/nftapp/nft/transfer --data-binary '{"base_req":{"from":"cosmos1np0wt2u949r3k6r5km023c6w5vp5dedyrglld9","chain_id":"NFTChain", "account_number": "0", "sequence": "4" },"token_id":"81bc9d76-5a1d-44d3-bdd5-c8a4bba155b1","owner":"cosmos1np0wt2u949r3k6r5km023c6w5vp5dedyrglld9", "name": "validator1", "password": "Committed"}'
    this.$axios
      .$post(rootState.config.zone1Node + '/nftapp/nft/transfer', {
        base_req: {
          from: rootGetters['user/currentUser'].address,
          chain_id: rootState.config.chainId,
          account_number: rootGetters['user/currentUser'].account_number,
          sequence: rootGetters['user/currentUser'].sequence, // (parseInt(rootGetters['user/currentUser'].sequence) + 1).toString(),
        },
        token_id: tokenId,
        owner: rootGetters['user/currentUser'].address,
        name: rootGetters['user/currentUser'].name,
        password: rootGetters['user/currentUser'].password,
        price: price.toString() + 'token',
      })
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        console.error('nftapp/nft/transfer', e)
        reject(e)
      })
  })
}

export function receiveTokenOnHub({ commit, state, getters, rootState, rootGetters }, tokenId) {
  // todo http post to hub
  return Promise.resolve()
}

export function removeTokenFromSale({ commit, state, getters, rootState, rootGetters }, tokenId) {
  // todo http post to hub
  return Promise.resolve()
}

export function addTokenToSale({ commit, state, getters, rootState, rootGetters }, tokenId) {
  return Promise.resolve()

  // todo http post to hub
  // return new Promise((resolve, reject) => {
  //   // curl -s -XPOST http://localhost:1317/nftapp/nft --data-binary '{"base_req":{"from":"cosmos1np0wt2u949r3k6r5km023c6w5vp5dedyrglld9","chain_id":"NFTChain", "account_number": "0", "sequence": "3" },"token_name":"alpha","description":"beta","image":"gamma","token_uri":"kappa","owner":"cosmos1np0wt2u949r3k6r5km023c6w5vp5dedyrglld9", "name": "validator1", "password": "Committed"}'
  //
  //   //todo ser real url
  //   this.$axios
  //     .$post(rootState.config.zone2Node + '/nftapp/nft/cacel', {
  //       base_req: {
  //         from: rootGetters['user/currentUser'].address,
  //         chain_id: rootState.config.chainId,
  //         account_number: rootGetters['user/currentUser'].account_number,
  //         sequence: rootGetters['user/currentUser'].sequence,
  //       },
  //       token_id: tokenId,
  //       owner: rootGetters['user/currentUser'].address,
  //       name: rootGetters['user/currentUser'].name,
  //       password: rootGetters['user/currentUser'].password,
  //     })
  //     .then(response => {
  //       resolve(response)
  //     })
  //     .catch(e => {
  //       console.error('nftapp/nft/transfer', e)
  //       reject(e)
  //     })
  // })
}



export function createTokenSign({ commit, state, getters, rootState, rootGetters }, tokenInfo) {
  if (rootGetters['user/currentUser'] === null) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    // curl -s -XPOST http://localhost:1317/nftapp/nft --data-binary '{"base_req":{"from":"cosmos1np0wt2u949r3k6r5km023c6w5vp5dedyrglld9","chain_id":"NFTChain", "account_number": "0", "sequence": "3" },"token_name":"alpha","description":"beta","image":"gamma","token_uri":"kappa","owner":"cosmos1np0wt2u949r3k6r5km023c6w5vp5dedyrglld9", "name": "validator1", "password": "Committed"}'
    this.$axios
      .$post(rootState.config.zone1Node + '/nftapp/nft', {
        base_req: {
          from: rootGetters['user/currentUser'].address,
          chain_id: rootState.config.chainId,
          account_number: rootGetters['user/currentUser'].account_number,
          sequence: rootGetters['user/currentUser'].sequence,
        },
        token_name: tokenInfo.name,
        description: tokenInfo.description,
        image: tokenInfo.image,
        token_uri: tokenInfo.url,
        owner: rootGetters['user/currentUser'].address,
        name: rootGetters['user/currentUser'].name,
        password: rootGetters['user/currentUser'].password,
      })
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        console.error('nftapp/nft/transfer', e)
        reject(e)
      })
  })
}