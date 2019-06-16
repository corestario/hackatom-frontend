export default {
  userTokens(state, tokens) {
    state.tokens = Object.values(tokens)
  },
  hubTokens(state, tokens) {
    state.hubTokens = Object.values(tokens).map(t => ({
      ...t,
      price: t.price || parseInt(Math.random() * 50).toString(),
      status: t.status || Math.random() > 0.5 ? 'onSale' : '',
    }))
  },
  setMyTokensOnSale(state, { tokens }) {
    state.tokensOnSale = tokens;
  },
  seTtokensOnMaket(state, { tokens }) {
    state.tokensOnMarket = tokens;
  },
};
