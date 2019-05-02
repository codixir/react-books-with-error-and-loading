import { combineReducers } from 'redux';
import books from './bookReducer';

export default combineReducers({
    booksData: books,
});