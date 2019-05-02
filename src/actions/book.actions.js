import { ADD_BOOK, 
        ADD_BOOK_ERROR,
        ADD_BOOK_LOADING,
        EDIT_BOOK,       
        EDIT_BOOK_ERROR,
        DELETE_BOOK,
        DELETE_BOOK_ERROR,
        FETCH_BOOKS,     
        FETCH_BOOKS_ERROR,
        FETCH_BOOKS_LOADING
    } from './types';
import axios from 'axios';

const url = 'http://localhost:8000/books';

export const createBook = (book) => {
     if (book.id) {
        const data = {
            ID: book.id,
            Title: book.title,
            Author: book.author,
            Year: book.year,
        };

        return (dispatch) => {
            updateBook(dispatch, data);
        }

    } else {
        const data = {
            Title: book.title,
            Author: book.author,
            Year: book.year,
        };
        let isLoading = true;

        return (dispatch) => {
            if (isLoading) {
                dispatch(createBookLoading(isLoading));
            }

            return axios.post(url, data)
                .then(response => {                
                    const id = response.data;

                    return axios.get(`${url}/${id}`).then(response => {
                        isLoading = false;
                        dispatch(createBookLoading(isLoading));     
                        dispatch(createBookSuccess(response.data));
                    }).catch((error) => {
                        isLoading = false;
                        dispatch(createBookLoading(isLoading));     
                        dispatch(createBookError(error));
                    });
                }).catch(error => { 
                    dispatch(createBookError(error));
                });
        };
    }
};

export const createBookSuccess = (book) => {
    return {
        type: ADD_BOOK,
        payload: {
            id: book.ID,
            title: book.Title,
            author: book.Author,
            year: book.Year,
        }
    };
};

export const createBookError = (error) => {
    const errorPayload = {
        message: error.response.data.message,
        status: error.response.status,
        scope: 'create-book',
    };

    return {
        type: ADD_BOOK_ERROR,
        payload: errorPayload,
    };
};

export const createBookLoading = (isLoading) => {
    return {
        type: ADD_BOOK_LOADING,
        payload: isLoading,
    };
};

export const updateBookError = (error) => {
    const errorPayload = {
        message: error.response.data.message ? error.response.data.message : error.response.data,
        status: error.response.status,
        scope: 'create-book',
    };

    return {
        type: EDIT_BOOK_ERROR,
        payload: errorPayload,
    };
};

export const updateBookSuccess = (book) => {
    return {
        type: EDIT_BOOK,
        payload: {
            id: book.ID,
            title: book.Title,
            author: book.Author,
            year: book.Year,
        },
    };
};

export const updateBook = (dispatch, data) => {
    const id = data.ID;

    return axios.put(url, data) 
        .then(response => {
            return axios.get(`${url}/${id}`).
                then(response => {
                    dispatch(updateBookSuccess(response.data));
                }).catch(error => {
                    dispatch(updateBookError(error));
                })
        })
        .catch(error => {
            dispatch(updateBookError(error));
        });
}

export const deleteBook = (id) => {
    return (dispatch) => {
        return axios.delete(`${url}/${id}`).then(() => {
            dispatch(deleteBookSuccess(id));
        }).catch(error => {
            dispatch(deleteBookError(error));
        });
    }
};

export const deleteBookSuccess = (id) => {
    return {
        type: DELETE_BOOK,
        payload: {
            id: id,
        },
    };
};


export const deleteBookError = (error) => {
    const errorPayload = {
        message: error.response.data.message,
        status: error.response.status,
        scope: 'delete-book',
    };

    return {
        type: DELETE_BOOK_ERROR,
        payload: errorPayload,
    }
};

export const fetchBooksSuccess = (books) => {
    return {
        type: FETCH_BOOKS,
        payload: books,
    };
};

const fetchAllBooksErrors = (error) => {
    const errorPayload = {
        message: error.response.data,
        status: error.response.status,
        scope: 'get-books',
    };

    return {
        type: FETCH_BOOKS_ERROR,
        payload: errorPayload,
    };
};

const fetchAllBooksLoading = (isLoading) => {
    return {
        type: FETCH_BOOKS_LOADING,
        payload: isLoading,
    };
};


const normalizeResponse = (data) => {
    const arr = data.map(item => {
        const keys = Object.keys(item);

        keys.forEach(k => {
            item[k.toLowerCase()] = item[k];
            delete item[k];
        });

        return item;
    });

    return arr;
};

export const fetchAllBooks = () => {
    let isLoading = true;

    return (dispatch) => {
        if (isLoading) {
            dispatch(fetchAllBooksLoading(isLoading));
        }

        return axios.get(url)            
            .then(response => {
                isLoading = false;
                dispatch(fetchAllBooksLoading(isLoading));                
                const data = normalizeResponse(response.data);
                dispatch(fetchBooksSuccess(data));
            }).catch(error => {
                isLoading = false;
                dispatch(fetchAllBooksLoading(isLoading));
                dispatch(fetchAllBooksErrors(error))
            });
    };
};