export function findToken(state) {
  return id => {
    return state.tokens.find(x => x.id === id)
  }
}

export function hubTokens(state) {
  // todo change status to real
  return (owner = null, onSale = null) => {
    return state.hubTokens.filter(
      x => (onSale === null || onSale ? x.status === 'onSale' : x.status !== 'onSale') && (!owner || x.owner === owner)
    )
  }
}
