import { combineReducers } from 'redux'
import month from './monthReducer'

const rootReducer = combineReducers({
  month,
})

export default rootReducer