export default {
  userTokens(state, tokens) {
    state.tokens = Object.values(tokens)
  },
  setMyTokensOnSale(state, { tokens }) {
    state.tokensOnSale = tokens;
  },
  seTtokensOnMaket(state, { tokens }) {
    state.tokensOnMarket = tokens;
  },
};
