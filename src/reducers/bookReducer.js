import { ADD_BOOK, 
    ADD_BOOK_ERROR,
    ADD_BOOK_LOADING,
    EDIT_BOOK,       
    EDIT_BOOK_ERROR,
    EDIT_BOOK_LOADING,  
    DELETE_BOOK,
    DELETE_BOOK_ERROR,
    DELETE_BOOK_LOADING,
    FETCH_BOOKS,     
    FETCH_BOOKS_ERROR,
    FETCH_BOOKS_LOADING
        } from '../actions/types';

const defaultState = {
    books: [],
    errors: null,
    isLoading: true,
};

const bookReducer = (state = defaultState, action) => {    
    switch(action.type) {
        case ADD_BOOK:            
            return { ...state, errors: null, books: [ ...state.books, action.payload ]};
        case ADD_BOOK_ERROR:
            return { ...state, errors: action.payload };            
        case EDIT_BOOK:            
            const updatedBooks = state.books.filter(book => book.id != action.payload.id);    
            return { ...state, errors: null, books: [...updatedBooks, action.payload ]};   
        case EDIT_BOOK_ERROR:
            return { ...state, errors: action.payload }; 
        case DELETE_BOOK:
            const filteredBooks = state.books.filter(book => book.id != action.payload.id);
            return { ...state, books: filteredBooks };
        case DELETE_BOOK_ERROR:
            return { ...state, errors: action.payload }
        case FETCH_BOOKS:  
            return { ...state, books: action.payload }
        case FETCH_BOOKS_ERROR:            
            return { ...state, errors: action.payload }
        case FETCH_BOOKS_LOADING:
            return { ...state, isLoading: action.payload }
        default:
            return state;
    }
};

export default bookReducer;