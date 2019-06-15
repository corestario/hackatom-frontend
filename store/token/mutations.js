export default {
  userTokens(state, tokens) {
    state.tokens = Object.values(tokens)
  },
  hubTokens(state, tokens) {
    state.hubTokens = Object.values(tokens)
  },
  setMyTokensOnSale(state, { tokens }) {
    state.tokensOnSale = tokens;
  },
  seTtokensOnMaket(state, { tokens }) {
    state.tokensOnMarket = tokens;
  },
};
