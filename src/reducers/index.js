import { combineReducers } from "redux";
import lists from './lists'

export default combineReducers({
    movies: lists
})