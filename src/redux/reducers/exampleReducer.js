
const initialState = ""

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "EXAMPLE":
        return action.payload
    default:
      return state
  }
}

export default reducer