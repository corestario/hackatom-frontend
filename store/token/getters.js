export function findToken(state) {
    return id => {
        return state.tokens.find(o => o.id === id)
    }
}
