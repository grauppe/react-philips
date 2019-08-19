const initialValue = {
  listmovie: []
}

const lists = (state = initialValue, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return {
        ...state,
        listmovie: [
          ...state.listmovie,
          {
            id: action.payload.id,
            tile: action.payload.title,
            release: action.payload.release,
            poster: action.payload.poster
          }
        ]
      }
    case 'DEL_LIST':
      return {
        ...state,
        listmovie: [
          ...state.listmovie.filter(x => x !== action.payload)
        ]
      }
    default:
      return state
  }
}

export default lists
